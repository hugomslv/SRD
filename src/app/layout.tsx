import type { ReactNode } from 'react'

// Layout racine minimal — toutes les routes passent par [locale]/layout.tsx
// qui fournit <html lang={locale}> et <body>.
export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return children
}
