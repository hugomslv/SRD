import type fr from '@/messages/fr.json'
import frMessages from '@/messages/fr.json'
import enMessages from '@/messages/en.json'
import ptMessages from '@/messages/pt.json'

export type Locale = 'fr' | 'en' | 'pt'
export type Messages = typeof fr

export const locales: Locale[] = ['fr', 'en', 'pt']
export const defaultLocale: Locale = 'fr'

const allMessages: Record<Locale, Messages> = {
  fr: frMessages,
  en: enMessages as Messages,
  pt: ptMessages as Messages,
}

export function isValidLocale(value: string): value is Locale {
  return (locales as string[]).includes(value)
}

export function getMessages(locale: Locale): Messages {
  return allMessages[locale] ?? allMessages[defaultLocale]
}
