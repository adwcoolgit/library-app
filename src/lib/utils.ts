import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeImageSrc(
  src?: string,
  fallback: string = '/../../public/images/Finance.png'
) {
  if (!src || typeof src !== 'string') return fallback;

  try {
    const url = new URL(src);
    return url.href.toString();
  } catch (_) {}
}
