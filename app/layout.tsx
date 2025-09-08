import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar/Navbar"
import ClientOnly from "@/components/ClientOnly"
import RentModal from "@/components/modal/RentModal"
import { getSession } from "@/lib/auth/get_session"
import { Toaster } from "sonner"
import SearchModal from "@/components/modal/SearchModal"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Fakebnb",
  description:
    "A clone of Airbnb built with Next.js, TypeScript, Prisma, Better-Auth and AWS.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientOnly>
          <Toaster position="bottom-center" />
          <Navbar session={session} />
          <RentModal />
          <SearchModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
