"use client"
import { Inter } from 'next/font/google'
import Prvider from '@/Redux/Prvider'
import useSetClient from '@/hooks/useSetClient'



const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'BIBLIOTHECA',
  description: 'books at your finger tip.',
}




export default function RootLayout({ children }) {
 
  useSetClient();
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <Prvider>
          {children}
        </Prvider>

      </body>
    </html>
  )
}
