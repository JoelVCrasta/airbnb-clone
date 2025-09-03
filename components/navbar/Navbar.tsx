"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "@/lib/auth_client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"

const Navbar = () => {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const handleListing = useCallback(() => {
    if (!session) {
      router.push("/sign-up")
    } else {
      alert("TODO: Open rent modal")
    }
  }, [session, router])

  return (
    <header className="px-4 mx-auto sm:px-6 lg:px-8 border-b-[1px] border-b-gray-200">
      <div className="flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" title="stayeo" className="flex">
            <p className="text-3xl font-normal">fakebnb</p>
          </Link>
        </div>

        <div className="font-geist flex items-center justify-center space-x-4 lg:space-x-10">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={handleListing}
          >
            List your home
          </Button>

          {/* Dropdown */}
          {isPending ? null : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="rounded-full">
                  <Menu />
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={session.user.image ?? ""} />
                    <AvatarFallback>
                      {session.user.name?.charAt(0) ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {session.user.name ?? "My Account"}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => signOut()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => router.push("/signup")}
              className="text-sm rounded-full"
            >
              Get started
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
