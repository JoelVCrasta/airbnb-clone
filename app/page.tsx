"use client"

import { signIn, signOut, signUp, useSession } from "@/lib/auth_client"
import SignIn from "./(auth)/signin/page"

const Home = () => {
  const { data } = useSession()

  return <div></div>
}

export default Home
