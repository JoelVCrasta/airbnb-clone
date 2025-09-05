"use client"

import CardWrapper from "@/components/CardWrapper"
import FormSuccess from "../FormSuccess"
import FormError from "../FormError"
import { useRouter } from "next/navigation"
import { useAuthState } from "@/app/hooks/useAuthState"
import { useForm } from "react-hook-form"
import SignUpSchema from "@/utils/zod/signup-schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUp, signIn } from "@/lib/auth/auth_client"
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

const SignUp = () => {
  const router = useRouter()
  const { error, success, loading, setError, setSuccess, setLoading, reset } =
    useAuthState()

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    try {
      await signUp.email(
        {
          name: `${values.firstname} ${values.lastname}`,
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
            setSuccess("Check ur mail to verify your account")
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

  const handleGoogleSignUp = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }

  return (
    <CardWrapper
      cardTitle="Sign up"
      cardDescription="New here? Let's get you started."
      cardFooterDescription="Already have an account?"
      cardFooterLink="/signin"
      cardFooterLinkTitle="Sign in"
    >
      {/* Email/Password Auth */}
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="text"
                      placeholder="John"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="text"
                      placeholder="Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
            Sign up
          </Button>
        </form>
      </Form>

      <OrDivider />

      {/* Google Auth */}
      <Button
        variant={"outline"}
        onClick={handleGoogleSignUp}
        className="w-full"
      >
        <FcGoogle />
        Google
      </Button>
    </CardWrapper>
  )
}

export default SignUp
