"use client"

import CardWrapper from "@/components/CardWrapper"
import FormSuccess from "../FormSuccess"
import FormError from "../FormError"
import { useRouter } from "next/navigation"
import { useAuthState } from "@/app/hooks/useAuthState"
import { useForm } from "react-hook-form"
import SignInSchema from "@/utils/zod/signin-schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "@/lib/auth/auth_client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import OrDivider from "../OrDivider"
import { FcGoogle } from "react-icons/fc"

const SignIn = () => {
  const router = useRouter()
  const { error, success, loading, setError, setSuccess, setLoading, reset } =
    useAuthState()

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      await signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onResponse: () => {
            setLoading(false)
          },
          onRequest: () => {
            reset()
            setLoading(true)
          },
          onSuccess: () => {
            setSuccess("Signed in successfully")
            setTimeout(() => router.replace("/"), 1000)
          },
          onError: (ctx) => {
            setError(ctx.error.message)
          },
        }
      )
    } catch (error) {
      console.log(error)
      setError("Somthing went wrong")
    }
  }

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }

  return (
    <CardWrapper
      cardTitle="Sign in"
      cardDescription="Hey! Welcome back."
      cardFooterDescription="Don't have an account?"
      cardFooterLink="/signup"
      cardFooterLinkTitle="Sign up"
    >
      {/* Email/Password Auth */}
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button disabled={loading} type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </Form>

      <OrDivider />

      {/* Google Auth */}
      <Button
        variant={"outline"}
        onClick={handleGoogleSignIn}
        className="w-full"
      >
        <FcGoogle />
        Google
      </Button>
    </CardWrapper>
  )
}

export default SignIn
