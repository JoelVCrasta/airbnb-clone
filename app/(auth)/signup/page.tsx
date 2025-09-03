import SignUp from "@/components/auth/signup"
import { getSession } from "@/lib/get_session"
import { redirect } from "next/navigation"

const SignUpPage = async () => {
  const session = await getSession()
  if (session) {
    redirect("/")
  }

  return <SignUp />
}

export default SignUpPage
