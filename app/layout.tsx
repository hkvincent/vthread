import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MyThemeProvider from './context/MyThemeProvider'
import ModalContext, { ModalProvider } from './context/ModalContext'
import MySessionProvider from './context/MySessionProvider'
import { Toaster } from 'react-hot-toast'

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
          <ModalProvider>
            <MySessionProvider>
              {children}
              <Toaster />
            </MySessionProvider>
          </ModalProvider>
        </MyThemeProvider>
      </body>
    </html >

  )
}
