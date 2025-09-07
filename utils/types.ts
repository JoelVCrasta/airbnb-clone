import { User as BAUser } from "better-auth"
import { User as PCUser, Reservation } from "@prisma/client"
import { Listing } from "@prisma/client"

export interface SafeUser extends BAUser {
  favouriteIds: string[]
}

export type SafeUserFromPrisma = Omit<PCUser, "createdAt" | "updatedAt">

export interface Verification {
  id: string
  identifier: string
  value: string
  expiresAt: Date
  createdAt?: Date
  updatedAt?: Date
}

export type SafeListing = Omit<Listing, "createdAt" | "updatedAt"> & {
  createdAt: string
  updatedAt: string
}

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "updatedAt" | "checkIn" | "checkOut"
> & {
  createdAt: string
  updatedAt: string
  checkIn: string
  checkOut: string
  listing: SafeListing
}

export type CountrySelectType = {
  flag: string
  label: string
  latlng: [number, number]
  region: string
  value: string
}

export interface SearchListingParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  checkIn?: string
  checkOut?: string
  location?: string
  category?: string
}
