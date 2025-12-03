import {NextResponse} from "next/server";
import {contactSchema} from "@/lib/validation/contact";
import {Resend} from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const contactEmail = process.env.CONTACT_EMAIL;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  if (!resend || !contactEmail) {
    console.error("CONTACT_FORM_MISSING_ENV");
    return NextResponse.json({ok: false, message: "Server configuration error"}, {status: 500});
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ok: false, message: "Invalid JSON"}, {status: 400});
  }

  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ok: false, errors: parsed.error.flatten()}, {status: 400});
  }

  const {name, email, message} = parsed.data;

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `Nowa wiadomosc od ${name}`,
      text: `Imie: ${name}
Email: ${email}

Wiadomosc:
${message}`,
    });

    return NextResponse.json({ok: true});
  } catch (err) {
    console.error("CONTACT_FORM_ERROR", err);
    return NextResponse.json({ok: false}, {status: 500});
  }
}
