'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/validation/contact';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import { useState } from 'react';

export type ContactFormMessages = {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  messageHint?: string;
  submit: string;
  success: string;
  error: string;
};

export default function ContactForm({
  locale,
  messages,
}: {
  locale: string;
  messages: ContactFormMessages;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });
  const [sent, setSent] = useState<null | 'ok' | 'err'>(null);

  async function onSubmit(data: ContactInput) {
    setSent(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSent('ok');
      trackEvent('contact_sent', { locale });
      reset();
    } catch {
      setSent('err');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form space-y-5">
      <div className="contact-form-field">
        <label className="mb-2 block text-sm font-semibold" htmlFor="name">
          {messages.nameLabel}
        </label>
        <Input
          id="name"
          data-testid="contact-name"
          className="contact-form-input"
          placeholder={messages.namePlaceholder ?? 'Jan'}
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name?.message && (
          <p className="contact-form-error mt-1 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="contact-form-field">
        <label className="mb-2 block text-sm font-semibold" htmlFor="email">
          {messages.emailLabel}
        </label>
        <Input
          id="email"
          type="email"
          data-testid="contact-email"
          className="contact-form-input"
          placeholder={messages.emailPlaceholder ?? 'jan@example.com'}
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email?.message && (
          <p className="contact-form-error mt-1 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="contact-form-field">
        <label className="mb-2 block text-sm font-semibold" htmlFor="message">
          {messages.messageLabel}
        </label>
        {messages.messageHint ? (
          <p className="contact-form-hint mb-2 text-sm">{messages.messageHint}</p>
        ) : null}
        <textarea
          id="message"
          data-testid="contact-message"
          className="contact-form-textarea w-full rounded-md px-3 py-2 text-sm outline-none"
          rows={5}
          aria-invalid={!!errors.message}
          placeholder={messages.messagePlaceholder}
          {...register('message')}
        />
        {errors.message?.message && (
          <p className="contact-form-error mt-1 text-sm">{errors.message.message}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting} data-testid="contact-submit">
          {isSubmitting ? '...' : messages.submit}
        </Button>
        {sent === 'ok' && <span className="contact-form-success text-sm">{messages.success}</span>}
        {sent === 'err' && <span className="contact-form-error text-sm">{messages.error}</span>}
      </div>
    </form>
  );
}
