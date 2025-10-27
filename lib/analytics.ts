declare global {
  interface Window {
    plausible?: (event: string, options?: {props?: Record<string, any>}) => void;
  }
}

export function trackEvent(name: string, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    try {
      window.plausible(name, data ? {props: data} : undefined);
    } catch {
      // ignore
    }
  }
}
