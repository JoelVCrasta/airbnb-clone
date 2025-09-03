"use client"

import { signIn, signOut, signUp, useSession } from "@/lib/auth_client"
import SignIn from "./(auth)/signin/page"
import Categories from "@/components/navbar/Categories"
import ClientOnly from "@/components/ClientOnly"
import HeartButton from "@/components/HeartButton"
import Modal from "@/components/modal/Modal"

const Home = () => {
  return (
    <>
      <ClientOnly>
        <Categories />
      </ClientOnly>

      
    </>
  )
}

export default Home
