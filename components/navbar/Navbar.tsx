"use client"

import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth/auth_client"
import useRentModal from "@/app/hooks/useRentModal"
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
