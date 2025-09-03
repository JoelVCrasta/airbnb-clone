import SignIn from "@/components/auth/signin"
import { getSession } from "@/lib/get_session"
import { redirect } from "next/navigation"

const SignInPage = async () => {
  const session = await getSession()
  if (session) {
    redirect("/")
  }

  return <SignIn />
}

export default SignInPage
