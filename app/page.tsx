"use client"

import { signIn, signOut, signUp, useSession } from "@/lib/auth_client"

const Home = () => {
  const { data } = useSession()

  return (
    <div>
      {data?.user ? (
        <>
          <span>Welcome, {data.user.name}</span>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button
          onClick={() =>
            signIn.social({
              provider: "google",
              errorCallbackURL: "/error",
            })
          }
          className="bg-red-400"
        >
          Sign in with Google
        </button>
      )}
    </div>
  )
}

export default Home
