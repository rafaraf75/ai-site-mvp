"use client";

import {useEffect, useRef, useState} from "react";
import {MessageCircle, Send, X} from "lucide-react";
import {Button} from "@/components/ui/button";

type Msg = {id: string; role: "user" | "assistant"; text: string};

function answerFor(input: string, locale: string): string {
  const q = input.toLowerCase();
  if (/(cena|pakiet|price)/i.test(q)) {
    return locale === "pl"
      ? "Mamy 3 pakiety (Starter/Pro/Custom). Zobacz sekcję Pakiety lub przejdź do kontaktu, aby dobrać plan."
      : locale === "es"
      ? "Tenemos 3 paquetes (Starter/Pro/Custom). Revisa la sección de Paquetes o ve a Contacto."
      : "We have 3 packages (Starter/Pro/Custom). Check the Pricing section or go to Contact.";
  }
  if (/(kontakt|contact)/i.test(q)) {
    return locale === "pl"
      ? "Najłatwiej skontaktować się przez stronę Kontakt — formularz wyśle do nas wiadomość."
      : locale === "es"
      ? "La forma más fácil es la página de Contacto — el formulario nos envía tu mensaje."
      : "The easiest way is the Contact page — the form sends us your message.";
  }
  if (/(i18n|język|language)/i.test(q)) {
    return locale === "pl"
      ? "Serwis obsługuje języki PL/EN/ES oraz hreflang."
      : locale === "es"
      ? "El sitio soporta ES/EN/PL y hreflang."
      : "The site supports EN/PL/ES and hreflang.";
  }
  return locale === "pl"
    ? "To demonstracyjny widget bez zapisu danych. Podaj słowo kluczowe (np. cena, kontakt, i18n) lub przejdź do sekcji na stronie."
    : locale === "es"
    ? "Widget de demostración sin guardar datos. Escribe una palabra clave (p.ej. precio, contacto, i18n) o navega a la sección."
    : "Demo widget (no data stored). Try a keyword (e.g. price, contact, i18n) or navigate to the section.";
}

export default function ChatWidget({locale}: {locale: string}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m0",
      role: "assistant",
      text:
        locale === "pl"
          ? "Cześć! Jestem lekkim widgetem demo. Nie zapisuję danych. Zadaj pytanie (np. cena, kontakt, i18n)."
          : locale === "es"
          ? "¡Hola! Soy un widget de demostración. No guardo datos. Pregunta (p.ej. precio, contacto, i18n)."
          : "Hi! I'm a lightweight demo widget. I don't store data. Ask about price, contact, i18n.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Msg = {id: crypto.randomUUID(), role: "user", text};
    const botMsg: Msg = {id: crypto.randomUUID(), role: "assistant", text: answerFor(text, locale)};
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  }

  function close() {
    setOpen(false);
    openerRef.current?.focus();
  }

  return (
    <div aria-live="polite">
      <Button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-40 shadow-lg border right-[calc(env(safe-area-inset-right,0)+1rem)] bottom-[calc(env(safe-area-inset-bottom,0)+5.5rem)] sm:bottom-[calc(env(safe-area-inset-bottom,0)+6.5rem)] md:bottom-[calc(env(safe-area-inset-bottom,0)+7.5rem)]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="chat-widget-dialog"
      >
        <MessageCircle className="mr-2" size={16} /> {locale === "pl" ? "Chat" : locale === "es" ? "Chat" : "Chat"}
      </Button>

      {open && (
        <div
          id="chat-widget-dialog"
          role="dialog"
          aria-modal="true"
          aria-label={locale === "pl" ? "Widget czatu" : locale === "es" ? "Widget de chat" : "Chat widget"}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="w-full sm:max-w-md sm:rounded-lg sm:shadow-xl sm:border bg-background text-foreground p-3 sm:p-4 m-0 sm:m-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">
                {locale === "pl" ? "Szybki chat (demo)" : locale === "es" ? "Chat rápido (demo)" : "Quick chat (demo)"}
              </div>
              <button aria-label="Close" className="p-2 hover:opacity-80" onClick={close}>
                <X size={16} />
              </button>
            </div>

            <div className="h-64 overflow-y-auto pr-1 space-y-2" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
                  <div
                    className={
                      "inline-block rounded-md px-3 py-2 text-sm " +
                      (m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground")
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                  if (e.key === "Escape") close();
                }}
                placeholder={
                  locale === "pl"
                    ? "Napisz wiadomość…"
                    : locale === "es"
                    ? "Escribe un mensaje…"
                    : "Type a message…"
                }
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="button" onClick={send} aria-label="Send">
                <Send size={16} />
              </Button>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {locale === "pl"
                ? "Prywatność: to demo nie wysyła rozmów na serwer i nic nie zapisuje."
                : locale === "es"
                ? "Privacidad: esta demo no envía conversaciones al servidor ni guarda datos."
                : "Privacy: this demo does not send conversations to a server and stores nothing."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

