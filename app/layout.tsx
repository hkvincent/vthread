import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MyThemeProvider from './utils/MyThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'V Thread',
  description: 'v socail community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <MyThemeProvider>
          {children}
        </MyThemeProvider>
      </body>
    </html >

  )
}
