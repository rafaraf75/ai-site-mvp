"use client";

import {useEffect, useRef, useState} from "react";
import {MessageCircle, Send, X} from "lucide-react";
import {Button} from "@/components/ui/button";

type Msg = {id: string; role: "user" | "assistant"; text: string};

type Copy = {
  dialogLabel: string;
  title: string;
  intro: string;
  placeholder: string;
  privacy: string;
  closeLabel: string;
  sendLabel: string;
  answers: {
    miniAudit: string;
    contact: string;
    languages: string;
    pricing: string;
    general: string;
  };
};

function copyFor(locale: string): Copy {
  if (locale === "pl") {
    return {
      dialogLabel: "Widget mini-audytu",
      title: "Mini-audyt RafLab",
      intro:
        "Czesc! Moge pomóc Ci sprawdzic, czy strona lub profil Google Twojej firmy ulatwia klientom kontakt. Najlepszy pierwszy krok to bezplatny mini-audyt.",
      placeholder: "Napisz wiadomosc...",
      privacy:
        "Ten widget jest tylko demonstracyjny i nie wysyla rozmów na serwer. Do mini-audytu uzyj formularza kontaktowego.",
      closeLabel: "Zamknij",
      sendLabel: "Wyslij",
      answers: {
        miniAudit:
          "Najlepszy pierwszy krok to bezplatny mini-audyt strony, profilu Google albo obecnosci online. Przejdz do kontaktu i wyslij link.",
        contact:
          "Najlatwiej przejsc do strony Kontakt i wyslac link do strony, profilu Google albo krótki opis firmy.",
        languages:
          "Mozliwa jest komunikacja PL / ES / EN, zaleznie od potrzeb firmy i klientów.",
        pricing:
          "Na tym etapie glówny pierwszy krok to bezplatny mini-audyt i rozmowa. Dopiero pózniej mozna ocenic, czy warto przygotowac konkretna propozycje.",
        general:
          "Moge pomóc w kierunku mini-audytu, Google, WhatsApp, formularzy i lokalnej widocznosci. Najlepiej zacząć od formularza kontaktowego.",
      },
    };
  }

  if (locale === "es") {
    return {
      dialogLabel: "Widget de mini-auditoria",
      title: "Mini-auditoria RafLab",
      intro:
        "Hola! Puedo ayudarte a revisar si la web o el perfil de Google de tu negocio facilita el contacto con clientes. El mejor primer paso es una mini-auditoria gratuita.",
      placeholder: "Escribe un mensaje...",
      privacy:
        "Este widget es solo orientativo y no envia conversaciones al servidor. Para la mini-auditoria usa el formulario de contacto.",
      closeLabel: "Cerrar",
      sendLabel: "Enviar",
      answers: {
        miniAudit:
          "El mejor primer paso es una mini-auditoria gratuita de la web, perfil de Google o presencia online. Ve a Contacto y envia el enlace.",
        contact:
          "La forma mas facil es ir a la pagina de Contacto y enviar el enlace de tu web, perfil de Google o una breve descripcion del negocio.",
        languages:
          "La comunicacion puede ser en PL / ES / EN, segun las necesidades del negocio y de sus clientes.",
        pricing:
          "Ahora el primer paso principal es la mini-auditoria gratuita y la conversacion. Despues se puede ver si tiene sentido preparar una propuesta concreta.",
        general:
          "Puedo orientarte sobre mini-auditoria, Google, WhatsApp, formularios y visibilidad local. Lo mejor es empezar por el formulario de contacto.",
      },
    };
  }

  return {
    dialogLabel: "Mini-audit widget",
    title: "RafLab mini-audit",
    intro:
      "Hi! I can help you check whether your website or Google profile makes it easy for customers to contact you. The best first step is a free mini-audit.",
    placeholder: "Write a message...",
    privacy:
      "This widget is only for guidance and does not send conversations to the server. For the mini-audit, use the contact form.",
    closeLabel: "Close",
    sendLabel: "Send",
    answers: {
      miniAudit:
        "The best first step is a free mini-audit of your website, Google profile or online presence. Go to Contact and send the link.",
      contact:
        "The easiest way is to use the Contact page and send your website link, Google profile or a short business description.",
      languages:
        "Communication can be in PL / ES / EN depending on the business and customer needs.",
      pricing:
        "At this stage the main first step is a free mini-audit and conversation. After that, it is possible to decide whether a concrete proposal makes sense.",
      general:
        "I can point you in the direction of a mini-audit, Google, WhatsApp, forms and local visibility. The best next step is the contact form.",
    },
  };
}

function answerFor(input: string, copy: Copy): string {
  const q = input.toLowerCase();

  if (/(mini|audit|audyt|auditoria|review)/i.test(q)) {
    return copy.answers.miniAudit;
  }

  if (/(cena|ceny|price|pricing|pakiet|pakiety|package|packages|presupuesto)/i.test(q)) {
    return copy.answers.pricing;
  }

  if (/(kontakt|contact|contacto|whatsapp|google|perfil|profile|form|formulario)/i.test(q)) {
    return copy.answers.contact;
  }

  if (/(jezyk|język|language|languages|idioma|idiomas|\bpl\b|\ben\b|\bes\b)/i.test(q)) {
    return copy.answers.languages;
  }

  return copy.answers.general;
}

export default function ChatWidget({locale}: {locale: string}) {
  const copy = copyFor(locale);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m0",
      role: "assistant",
      text: copy.intro,
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
    const botMsg: Msg = {
      id: crypto.randomUUID(),
      role: "assistant",
      text: answerFor(text, copy),
    };
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
        <MessageCircle className="mr-2" size={16} /> Chat
      </Button>

      {open && (
        <div
          id="chat-widget-dialog"
          role="dialog"
          aria-modal="true"
          aria-label={copy.dialogLabel}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="w-full sm:max-w-md sm:rounded-lg sm:shadow-xl sm:border bg-background text-foreground p-3 sm:p-4 m-0 sm:m-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{copy.title}</div>
              <button aria-label={copy.closeLabel} className="p-2 hover:opacity-80" onClick={close}>
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
                placeholder={copy.placeholder}
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="button" onClick={send} aria-label={copy.sendLabel}>
                <Send size={16} />
              </Button>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">{copy.privacy}</p>
          </div>
        </div>
      )}
    </div>
  );
}
