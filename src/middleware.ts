import { NextRequest, NextResponse } from 'next/server'

const locales = ['fr', 'en', 'pt']
const defaultLocale = 'fr'
const COOKIE_NAME = 'preferred-locale'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignorer les routes internes Next.js et fichiers statiques
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Vérifier si la route a déjà un préfixe de locale valide
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Déterminer la locale préférée via cookie, sinon défaut
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value
  const preferredLocale =
    cookieLocale && locales.includes(cookieLocale) ? cookieLocale : defaultLocale

  // Rediriger vers la route préfixée
  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
}
