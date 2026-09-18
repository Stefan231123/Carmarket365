import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/useTranslation";
import { Zap, Bell, Smartphone } from "lucide-react";

// ═════════════════════════════════════════════════════════════════════════
// TODO: paste the real store URLs once each listing goes live.
// Leave both empty ("") to disable the popup entirely.
// Set only one to publish for a single platform; the other button hides.
const IOS_URL = "";      // e.g. "https://apps.apple.com/mk/app/carmarket365/id0000000000"
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.carmarket.app&hl=mk&gl=MK";
// ═════════════════════════════════════════════════════════════════════════

// Show at most this many times per user (persisted in localStorage).
const MAX_SHOWS = 3;
// Delay before opening on page mount, so the user gets to see the page first.
const SHOW_DELAY_MS = 2500;
const STORAGE_KEY = "cm365_app_promo_shows";

function readShowCount(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const n = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(n) ? n : 0;
  } catch {
    // Private-mode / blocked storage — treat as maxed out so we don't nag.
    return MAX_SHOWS;
  }
}

function bumpShowCount() {
  try {
    localStorage.setItem(STORAGE_KEY, String(readShowCount() + 1));
  } catch {}
}

export function AppDownloadModal() {
  const { t, currentLanguage } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Disabled until at least one store URL is set.
    if (!IOS_URL && !ANDROID_URL) return;
    if (readShowCount() >= MAX_SHOWS) return;

    const timer = setTimeout(() => {
      // Recheck at fire time in case another tab bumped it.
      if (readShowCount() >= MAX_SHOWS) return;
      setOpen(true);
      bumpShowCount();
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const s = (mk: string, en: string, sq: string): string => {
    if (currentLanguage === "sq") return sq;
    if (currentLanguage === "en") return en;
    return mk;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none bg-white rounded-3xl">
        <div className="bg-black text-white px-6 pt-8 pb-6">
          <div className="flex justify-center mb-4">
            <img
              src="/favicon-512.png"
              alt="CarMarket365"
              width={72}
              height={72}
              className="rounded-2xl shadow-lg"
            />
          </div>
          <h2 className="text-center text-2xl font-bold tracking-tight text-balance">
            {s(
              "Симни ја апликацијата CarMarket365",
              "Get the CarMarket365 app",
              "Merr aplikacionin CarMarket365",
            )}
          </h2>
          <p className="text-center text-sm text-white/70 mt-2 max-w-sm mx-auto">
            {s(
              "Побрзо пребарување, push известувања за нови огласи и сè што ти треба на едно место.",
              "Faster search, push alerts for new listings, and everything you need in one place.",
              "Kërkim më i shpejtë, njoftime push për shpallje të reja, dhe gjithçka që të nevojitet në një vend.",
            )}
          </p>
        </div>

        <div className="px-6 py-5 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-50 grid place-items-center shrink-0">
              <Bell className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                {s("Push известувања", "Push notifications", "Njoftime push")}
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                {s(
                  "Дознај веднаш кога ќе се појави огласот што го чекаш.",
                  "Get alerted the moment a matching listing goes up.",
                  "Merr njoftim menjëherë kur shfaqet një shpallje që të përshtatet.",
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 grid place-items-center shrink-0">
              <Zap className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                {s("Побрзо и полесно", "Faster and smoother", "Më shpejt dhe më lehtë")}
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                {s(
                  "Пребарувај, зачувувај и контактирај без загубено време.",
                  "Search, save and contact sellers without the friction.",
                  "Kërko, ruaj dhe kontakto shitësit pa vonesa.",
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 grid place-items-center shrink-0">
              <Smartphone className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                {s(
                  "Секогаш при рака",
                  "Always in your pocket",
                  "Gjithmonë me ju",
                )}
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                {s(
                  "Прегледувај омилени и разговори дури и во движење.",
                  "Browse favorites and chats even on the go.",
                  "Shfleto të preferuarat dhe bisedat edhe në lëvizje.",
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {IOS_URL && (
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-black text-white rounded-xl px-4 py-3 hover:bg-gray-800 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-white/70">
                  {s("Симни од", "Download on the", "Shkarko në")}
                </div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </a>
          )}
          {ANDROID_URL && (
            <a
              href={ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-black text-white rounded-xl px-4 py-3 hover:bg-gray-800 transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.523 15.34l1.404-2.432a.29.29 0 00-.106-.397.29.29 0 00-.397.106l-1.422 2.464c-1.087-.497-2.307-.773-3.6-.773-1.293 0-2.513.276-3.6.773L8.376 12.62a.29.29 0 00-.397-.106.29.29 0 00-.106.397l1.404 2.432C6.86 16.762 5.014 19.18 4.75 22h14.5c-.264-2.82-2.11-5.238-4.727-6.66zM8.53 19.6a.87.87 0 110-1.74.87.87 0 010 1.74zm6.94 0a.87.87 0 110-1.74.87.87 0 010 1.74z"/>
              </svg>
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider text-white/70">
                  {s("Достапно на", "Get it on", "Merre në")}
                </div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-full pb-5 -mt-1 text-xs text-gray-500 hover:text-gray-800 transition-colors"
        >
          {s(
            "Продолжи на веб",
            "Continue on the web",
            "Vazhdo në web",
          )}
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default AppDownloadModal;
