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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium" htmlFor="name">
          {messages.nameLabel}
        </label>
        <Input id="name" placeholder="Jan" aria-invalid={!!errors.name} {...register('name')} />
        {errors.name?.message && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="email">
          {messages.emailLabel}
        </label>
        <Input
          id="email"
          type="email"
          placeholder="jan@example.com"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email?.message && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium" htmlFor="message">
          {messages.messageLabel}
        </label>
        <textarea
          id="message"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          rows={5}
          aria-invalid={!!errors.message}
          placeholder={messages.messagePlaceholder}
          {...register('message')}
        />
        {errors.message?.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '...' : messages.submit}
        </Button>
        {sent === 'ok' && <span className="text-sm text-green-600">{messages.success}</span>}
        {sent === 'err' && <span className="text-sm text-destructive">{messages.error}</span>}
      </div>
    </form>
  );
}
