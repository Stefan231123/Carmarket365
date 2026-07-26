import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { apiClient } from "@shared/api-client";
import { useSafeAuth } from "@/contexts/AuthContextSafe";
import { useTranslation } from "@/hooks/useTranslation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, MessageSquare } from "lucide-react";

interface Participant {
  id: string;
  name?: string;
  avatarUrl?: string;
}
interface Message {
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender: Participant;
}
interface Conversation {
  id: string;
  unreadCount: number;
  lastMessageAt: string;
  car?: { id: string; make: string; model: string; year: number };
  buyer: Participant;
  seller: Participant;
  messages?: Message[];
}

function initials(p?: Participant): string {
  const n = p?.name?.trim();
  if (!n) return "?";
  return n.split(/\s+/).map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

function timeLabel(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  return sameDay
    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString([], { day: "2-digit", month: "short" });
}

export default function Messages() {
  const { user } = useSafeAuth();
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(params.get("c"));
  const [active, setActive] = useState<Conversation | null>(null);
  const [loadingThread, setLoadingThread] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadList = useCallback(async () => {
    setLoadingList(true);
    try {
      const list = await apiClient.getMyConversations();
      setConversations(list);
    } finally {
      setLoadingList(false);
    }
  }, []);

  const openConversation = useCallback(
    async (id: string) => {
      setActiveId(id);
      setParams({ c: id }, { replace: true });
      setLoadingThread(true);
      try {
        const conv = await apiClient.getConversation(id);
        setActive(conv);
        await apiClient.markConversationRead(id);
        // reflect read state locally
        setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)));
      } finally {
        setLoadingThread(false);
      }
    },
    [setParams],
  );

  useEffect(() => {
    loadList();
  }, [loadList]);

  // Open the initially-selected conversation (from ?c= or first in list).
  useEffect(() => {
    if (!activeId && conversations.length > 0) {
      openConversation(conversations[0].id);
    } else if (activeId && !active) {
      openConversation(activeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages?.length]);

  // Near-realtime: silently refresh the conversation list every 5s.
  useEffect(() => {
    const id = setInterval(() => {
      apiClient.getMyConversations().then(setConversations).catch(() => {});
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Near-realtime: poll the open thread for new messages every 4s.
  useEffect(() => {
    if (!activeId) return;
    const id = activeId;
    let cancelled = false;
    const timer = setInterval(async () => {
      try {
        const conv = await apiClient.getConversation(id);
        if (cancelled) return;
        setActive((prev) => (prev && prev.id === id ? { ...prev, messages: conv.messages } : prev));
        if ((conv.unreadCount ?? 0) > 0) await apiClient.markConversationRead(id);
      } catch { /* transient error — next tick retries */ }
    }, 4000);
    return () => { cancelled = true; clearInterval(timer); };
  }, [activeId]);

  const send = async () => {
    const content = draft.trim();
    if (!content || !activeId || sending) return;
    setSending(true);
    try {
      const msg = await apiClient.sendMessage(activeId, content);
      setActive((prev) => (prev ? { ...prev, messages: [...(prev.messages ?? []), msg] } : prev));
      setDraft("");
      loadList(); // refresh ordering/preview
    } finally {
      setSending(false);
    }
  };

  const other = (c: Conversation): Participant => (c.buyer.id === user?.id ? c.seller : c.buyer);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">{t("messenger.title")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[70vh]">
          {/* Conversation list */}
          <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
            <ScrollArea className="flex-1">
              {loadingList ? (
                <div className="flex items-center justify-center h-40 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              ) : conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2 p-4 text-center">
                  <MessageSquare className="h-8 w-8" />
                  <p>{t("messenger.empty")}</p>
                </div>
              ) : (
                conversations.map((c) => {
                  const o = other(c);
                  return (
                    <button
                      key={c.id}
                      onClick={() => openConversation(c.id)}
                      className={`w-full text-left px-3 py-3 border-b hover:bg-muted/50 transition-colors flex items-center gap-3 ${
                        activeId === c.id ? "bg-muted" : ""
                      }`}
                    >
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={o.avatarUrl} />
                        <AvatarFallback>{initials(o)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium truncate">{o.name || t("messenger.user")}</span>
                          <span className="text-xs text-muted-foreground shrink-0">{timeLabel(c.lastMessageAt)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm text-muted-foreground truncate">
                            {c.car ? `${c.car.year} ${c.car.make} ${c.car.model}` : t("messenger.conversation")}
                          </span>
                          {c.unreadCount > 0 && <Badge className="shrink-0">{c.unreadCount}</Badge>}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </ScrollArea>
          </div>

          {/* Thread */}
          <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
            {!activeId ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                {t("messenger.selectConversation")}
              </div>
            ) : (
              <>
                {active?.car && (
                  <div className="px-4 py-3 border-b bg-muted/30">
                    <span className="font-medium">
                      {active.car.year} {active.car.make} {active.car.model}
                    </span>
                  </div>
                )}
                <ScrollArea className="flex-1 p-4">
                  {loadingThread ? (
                    <div className="flex items-center justify-center h-40 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {(active?.messages ?? []).map((m) => {
                        const mine = m.sender.id === user?.id;
                        return (
                          <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                                mine ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="whitespace-pre-wrap break-words text-sm">{m.content}</p>
                              <span className={`block text-[10px] mt-1 ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                {timeLabel(m.createdAt)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={bottomRef} />
                    </div>
                  )}
                </ScrollArea>
                <div className="p-3 border-t flex items-center gap-2">
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder={t("messenger.typeMessage")}
                    disabled={sending}
                  />
                  <Button onClick={send} disabled={sending || !draft.trim()} size="icon" aria-label="Send">
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
