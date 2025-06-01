import Navbar from '@/components/layout/Navbar'
import { Noto_Sans, Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans',
})

const notoSansTC = Noto_Sans_TC({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-tc',
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
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
