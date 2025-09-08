"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "@/lib/auth/auth_client"
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
import useRentModal from "@/app/hooks/useRentModal"
import Image from "next/image"
import Search from "./Search"
import Logo from "./Logo"
import User from "./User"
import Container from "../Container"

interface NavbarProps {
  session: ReturnType<typeof useSession>["data"]
}

const Navbar = ({ session }: NavbarProps) => {
  const router = useRouter()
  const RentModal = useRentModal()

  return (
    <header className="px-4 mx-auto sm:px-6 lg:px-8 border-b-[1px] border-b-gray-200 ">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0 h-20">
          <Logo />

          <div className="flex justify-center w-1/3">
            <Search />
          </div>

          <User session={session} />
        </div>
      </Container>
    </header>
  )
}

export default Navbar
