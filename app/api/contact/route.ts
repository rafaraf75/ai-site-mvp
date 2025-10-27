import {NextRequest, NextResponse} from 'next/server';
import {contactSchema} from '@/lib/validation/contact';

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ok: false, errors: parsed.error.flatten()}, {status: 400});
    }

    // Placeholder wysyłki — w MVP można podłączyć Formspree albo SMTP (nodemailer)
    // Tutaj tylko logujemy na serwerze.
    console.log('Contact message', {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message?.slice(0, 200),
      at: new Date().toISOString(),
    });

    return NextResponse.json({ok: true});
  } catch (e) {
    return NextResponse.json({ok: false}, {status: 500});
  }
}

