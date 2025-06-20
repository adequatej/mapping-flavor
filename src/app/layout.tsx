import Navbar from '@/components/layout/Navbar'
import { Noto_Sans, Noto_Sans_TC } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  weight: ['400', '500', '600', '700'],
})

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-noto-sans-tc',
  weight: ['400', '500', '700'],
})

export const metadata = {
  title: 'Mapping Flavor - Taiwan Night Markets',
  description:
    "Explore Taiwan's vibrant night markets through interactive maps and cultural stories",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${notoSans.variable} ${notoSansTC.variable}`}>
      <body className='min-h-screen bg-background text-foreground'>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
