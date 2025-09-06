import { User as BAUser } from "better-auth"

export interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
  sessions?: Session[]
  accounts?: Account[]
  listings?: Listing[]
  favouriteIds?: string[]
  reservations?: Reservation[]
}

export interface SafeUser extends BAUser {
  favouriteIds: string[]
}
export interface Session {
  id: string
  expiresAt: Date
  token: string
  createdAt: Date
  updatedAt: Date
  ipAddress?: string
  userAgent?: string
  userId: string
  user?: User
}

export interface Account {
  id: string
  accountId: string
  providerId: string
  userId: string
  user?: User
  accessToken?: string
  refreshToken?: string
  idToken?: string
  accessTokenExpiresAt?: Date
  refreshTokenExpiresAt?: Date
  scope?: string
  password?: string
  createdAt: Date
  updatedAt: Date
}

export interface Verification {
  id: string
  identifier: string
  value: string
  expiresAt: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface Listing {
  id: string
  userId: string
  user?: User
  title: string
  description: string
  imageUrls: string[]
  category: string
  roomCount: number
  bathroomCount: number
  guestCount: number
  price: number
  location: string
  reservations?: Reservation[]
  createdAt: Date
  updatedAt: Date
}

export type SafeListing = Omit<Listing, "createdAt" | "updatedAt"> & {
  createdAt: string
  updatedAt: string
}

export interface Reservation {
  id: string
  userId: string
  user?: User
  listingId: string
  listing?: Listing
  checkIn: Date
  checkOut: Date
  totalPrice: number
  createdAt: Date
  updatedAt: Date
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
