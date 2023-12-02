import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MyThemeProvider from './utils/MyThemeProvider'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: {
    default: 'VThread',
    template: '%s | VThread',
  },
  description: 'The new social Media.',
  appleWebApp: {
    title: "VThread",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest"></link>
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body className={inter.className}>
        <MyThemeProvider>
          {children}
        </MyThemeProvider>
      </body>
    </html >

  )
}
