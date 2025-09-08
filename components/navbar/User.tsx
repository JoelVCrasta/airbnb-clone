import { useCallback } from "react"
import { useRouter } from "next/navigation"
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

interface UserProps {
  session: ReturnType<typeof useSession>["data"]
}

const User = ({ session }: UserProps) => {
  const router = useRouter()
  const RentModal = useRentModal()

  const handleListing = useCallback(() => {
    if (!session) {
      router.push("/signup")
    } else {
      RentModal.onOpen()
    }
  }, [session, router, RentModal])

  return (
    <div className="font-geist flex items-center justify-end space-x-4 lg:space-x-6 w-1/3">
      <Button
        variant="outline"
        className="rounded-full hidden md:inline-block"
        onClick={handleListing}
      >
        List your home
      </Button>

      {/* Dropdown */}
      {session ? (
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

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel className="font-semibold">
              {session.user.name ?? "My Account"}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleListing}>
              List your home
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => router.push("/trips")}>
              My trips
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push("/favourites")}>
              My favourites
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push("/reservations")}>
              My reservations
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push("/listings")}>
              My listings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                signOut()
                router.refresh()
              }}
            >
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
  )
}

export default User
