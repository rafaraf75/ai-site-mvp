export type Variant = Record<string, any>;

export function fadeUp(reduce: boolean, y = 10, duration = 0.5): Variant {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration } },
  };
}

export function stagger(reduce: boolean, staggerChildren = 0.08): Variant {
  return {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: reduce ? 0 : staggerChildren } },
  };
}

export const viewportOnce = { amount: 0.2, once: true } as const;

