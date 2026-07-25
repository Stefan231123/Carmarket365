import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@shared/api-client";
import { useSafeAuth } from "@/contexts/AuthContextSafe";
import { useActiveListing } from "@/contexts/ActiveListingContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, X, ChevronLeft, Send, Loader2, Maximize2 } from "lucide-react";

interface Participant { id: string; name?: string; avatarUrl?: string; }
interface Message { id: string; content: string; createdAt: string; sender: Participant; }
interface Conversation {
  id: string;
  unreadCount: number;
  lastMessageAt: string;
  car?: { id: string; make: string; model: string; year: number };
  buyer: Participant;
  seller: Participant;
  messages?: Message[];
}

const initials = (p?: Participant) =>
  (p?.name?.trim()?.split(/\s+/).map((s) => s[0]).slice(0, 2).join("") || "?").toUpperCase();

const timeLabel = (iso: string) => {
  const d = new Date(iso);
  return d.toDateString() === new Date().toDateString()
    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString([], { day: "2-digit", month: "short" });
};

/**
 * Facebook-style floating messenger: a corner bubble with an unread badge that
 * toggles a compact chat panel (conversation list ⇄ thread). Only rendered for
 * signed-in users. Reuses the same messaging API as the /messages page.
 */
export function MessengerWidget() {
  const { user, isAuthenticated } = useSafeAuth();
  const { activeListing } = useActiveListing();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [active, setActive] = useState<Conversation | null>(null);
  const [loadingThread, setLoadingThread] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  // Compose-to-seller state (used when opened on a listing).
  const [composeDismissed, setComposeDismissed] = useState(false);
  const [composeDraft, setComposeDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const onOwnListing =
    !!activeListing?.sellerId && !!user?.id && activeListing.sellerId === user.id;
  const canComposeToListing = !!activeListing && !onOwnListing;
  // Derived so it stays correct even if the listing loads after the panel opens.
  const showCompose = open && !active && canComposeToListing && !composeDismissed;

  // Poll unread count while signed in.
  useEffect(() => {
    if (!isAuthenticated) { setUnread(0); return; }
    let cancelled = false;
    const load = () => apiClient.getUnreadMessageCount().then((n) => !cancelled && setUnread(n));
    load();
    const t = setInterval(load, 30000);
    return () => { cancelled = true; clearInterval(t); };
  }, [isAuthenticated]);

  const loadList = useCallback(async () => {
    setLoadingList(true);
    try { setConversations(await apiClient.getMyConversations()); }
    finally { setLoadingList(false); }
  }, []);

  // Load the conversation list whenever the panel opens; reset any dismissal.
  useEffect(() => {
    if (open) {
      loadList();
      setComposeDismissed(false);
    } else {
      setActive(null);
    }
  }, [open, loadList]);

  // Pre-fill the compose box for the listing being viewed (re-fills per listing).
  useEffect(() => {
    if (showCompose && activeListing) {
      setComposeDraft(`Hi, I'm interested in your ${activeListing.title}. Is it still available?`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCompose, activeListing?.carId]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [active?.messages?.length]);

  const openThread = async (id: string) => {
    setLoadingThread(true);
    try {
      const conv = await apiClient.getConversation(id);
      setActive(conv);
      await apiClient.markConversationRead(id);
      setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)));
      setUnread((u) => Math.max(0, u - (conversations.find((c) => c.id === id)?.unreadCount ?? 0)));
    } finally { setLoadingThread(false); }
  };

  const send = async () => {
    const content = draft.trim();
    if (!content || !active || sending) return;
    setSending(true);
    try {
      const msg = await apiClient.sendMessage(active.id, content);
      setActive((prev) => (prev ? { ...prev, messages: [...(prev.messages ?? []), msg] } : prev));
      setDraft("");
    } finally { setSending(false); }
  };

  // Send the pre-filled message to the seller of the listing being viewed.
  const sendCompose = async () => {
    const content = composeDraft.trim();
    if (!content || !activeListing || sending) return;
    setSending(true);
    try {
      const conv = await apiClient.startConversation(activeListing.carId, content);
      setComposeDismissed(true);
      setComposeDraft("");
      await openThread(conv.id);
    } finally { setSending(false); }
  };

  if (!isAuthenticated || !user) return null;

  const other = (c: Conversation): Participant => (c.buyer.id === user.id ? c.seller : c.buyer);

  return (
    <>
      {/* Lift the reCAPTCHA v3 badge above the messenger bubble so they don't overlap. */}
      <style>{`.grecaptcha-badge{bottom:96px!important;}`}</style>
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div className="w-[92vw] max-w-[380px] h-[540px] max-h-[75vh] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-primary text-primary-foreground">
            {active ? (
              <>
                <button onClick={() => setActive(null)} aria-label="Back" className="p-1 hover:bg-white/10 rounded-full">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <Avatar className="h-7 w-7">
                  <AvatarImage src={other(active).avatarUrl} />
                  <AvatarFallback className="text-xs text-foreground">{initials(other(active))}</AvatarFallback>
                </Avatar>
                <span className="font-medium truncate flex-1 text-sm">{other(active).name || "User"}</span>
              </>
            ) : showCompose ? (
              <>
                {conversations.length > 0 && (
                  <button onClick={() => setComposeDismissed(true)} aria-label="Back to conversations" className="p-1 hover:bg-white/10 rounded-full">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                <span className="font-semibold flex-1 text-sm truncate">
                  Message {activeListing?.sellerName || "seller"}
                </span>
              </>
            ) : (
              <>
                <MessageSquare className="h-5 w-5" />
                <span className="font-semibold flex-1 text-sm">Messages</span>
                <button onClick={() => navigate("/messages")} aria-label="Open full messages" className="p-1 hover:bg-white/10 rounded-full">
                  <Maximize2 className="h-4 w-4" />
                </button>
              </>
            )}
            <button onClick={() => { setOpen(false); setActive(null); }} aria-label="Close" className="p-1 hover:bg-white/10 rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          {showCompose ? (
            <div className="flex-1 flex flex-col p-3 gap-3">
              <p className="text-xs text-muted-foreground">
                To <span className="font-medium text-foreground">{activeListing?.sellerName || "the seller"}</span>
                {activeListing?.title ? <> · {activeListing.title}</> : null}
              </p>
              <Textarea
                value={composeDraft}
                onChange={(e) => setComposeDraft(e.target.value)}
                placeholder="Write your message…"
                className="flex-1 resize-none"
                autoFocus
              />
              <Button onClick={sendCompose} disabled={sending || !composeDraft.trim()} className="w-full">
                {sending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                Send to seller
              </Button>
              {conversations.length > 0 && (
                <button onClick={() => setComposeDismissed(true)} className="text-xs text-primary hover:underline text-center">
                  View all conversations
                </button>
              )}
            </div>
          ) : !active ? (
            <ScrollArea className="flex-1">
              {loadingList ? (
                <div className="flex items-center justify-center h-40 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /></div>
              ) : conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2 p-4 text-center text-sm">
                  <MessageSquare className="h-7 w-7" />
                  <p>No conversations yet. Message a seller from a listing to start one.</p>
                </div>
              ) : (
                conversations.map((c) => {
                  const o = other(c);
                  return (
                    <button key={c.id} onClick={() => openThread(c.id)} className="w-full text-left px-3 py-2.5 border-b hover:bg-muted/50 flex items-center gap-3">
                      <Avatar className="h-9 w-9 shrink-0"><AvatarImage src={o.avatarUrl} /><AvatarFallback>{initials(o)}</AvatarFallback></Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium truncate text-sm">{o.name || "User"}</span>
                          <span className="text-[11px] text-muted-foreground shrink-0">{timeLabel(c.lastMessageAt)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-muted-foreground truncate">{c.car ? `${c.car.year} ${c.car.make} ${c.car.model}` : "Conversation"}</span>
                          {c.unreadCount > 0 && (
                            <span className="shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">{c.unreadCount}</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </ScrollArea>
          ) : (
            <>
              <ScrollArea className="flex-1 p-3">
                {loadingThread ? (
                  <div className="flex items-center justify-center h-40 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /></div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {(active.messages ?? []).map((m) => {
                      const mine = m.sender.id === user.id;
                      return (
                        <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[80%] rounded-2xl px-3 py-1.5 ${mine ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                            <p className="whitespace-pre-wrap break-words text-sm">{m.content}</p>
                            <span className={`block text-[10px] mt-0.5 ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{timeLabel(m.createdAt)}</span>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={bottomRef} />
                  </div>
                )}
              </ScrollArea>
              <div className="p-2 border-t flex items-center gap-2">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Type a message…"
                  disabled={sending}
                  className="h-9"
                />
                <Button onClick={send} disabled={sending || !draft.trim()} size="icon" className="h-9 w-9 shrink-0" aria-label="Send">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Floating bubble — large, bold, high-contrast */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Messenger"
        className="relative h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/20 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
      >
        {open ? <X className="h-8 w-8" strokeWidth={2.5} /> : <MessageSquare className="h-8 w-8" strokeWidth={2.5} />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[24px] h-6 px-1.5 rounded-full bg-red-500 text-white text-xs font-extrabold flex items-center justify-center border-2 border-white shadow">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>
    </div>
    </>
  );
}
