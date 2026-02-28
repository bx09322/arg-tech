import type { Metadata, Viewport } from 'next'
import { Orbitron, Exo_2 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/context/cart-context'
import { Toaster } from 'sonner'
import './globals.css'

const _orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const _exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VORTEX GAMING - La Mejor Tecnologia Gaming de Argentina',
  description:
    'Tienda gaming premium en Argentina. Laptops gaming, perifericos, consolas y componentes PC con los mejores precios del mercado.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${_orbitron.variable} ${_exo2.variable} font-sans antialiased`}
      >
        <CartProvider>
          {children}
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#111111',
                border: '1px solid #222222',
                color: '#e8e8e8',
              },
            }}
          />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
