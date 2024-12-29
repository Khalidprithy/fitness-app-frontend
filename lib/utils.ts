import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomId(): number {
  const randomInt = Math.floor(Math.random() * 1000000); // Max 6 digits

  const timestamp = Math.floor(Date.now() / 1000) % 10000000; // Max 7 digits

  const uniqueId = timestamp * 1000000 + randomInt;

  return uniqueId;
}

export function stripHtml(html: string): string {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}
