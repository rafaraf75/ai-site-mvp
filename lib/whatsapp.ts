export function getWhatsAppBaseUrl(): string | undefined {
  const preferred = process.env.NEXT_PUBLIC_WHATSAPP_BASE_URL?.trim();
  if (preferred) {
    return preferred;
  }

  const legacy = process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim();
  if (!legacy) {
    return undefined;
  }

  try {
    const parsed = new URL(legacy);
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return legacy.split("?")[0]?.trim() || undefined;
  }
}

export function buildWhatsAppHref(
  baseUrl: string | undefined,
  prefilledMessage: string,
): string | undefined {
  if (!baseUrl) {
    return undefined;
  }

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}text=${encodeURIComponent(prefilledMessage)}`;
}
