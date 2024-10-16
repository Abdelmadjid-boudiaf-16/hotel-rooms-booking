"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import { useToast } from '@/hooks/use-toast' 
import { credentialsHandleSignIn, googleHandleSignIn } from '@/actions'
import Link from 'next/link'
import { loginSchema } from '@/form-schemas'
import { PasswordInput } from '@/components/ui/password-input'


export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true)
    try {
      const result = await credentialsHandleSignIn(values)

      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: result.error,
        })
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred",
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col w-full max-w-xl border border-black/20 rounded-md p-8 space-y-4 shadow-lg">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
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
                  <PasswordInput  placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
      <div className='relative border-t '><span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-background'>Or</span></div>
      <form action={googleHandleSignIn}>
        <Button variant="outline" className='w-full'>
          <Icons.google className="mr-2 h-4 w-4" />
          Google
          </Button>
          </form>
      <div className='flex items-center w-full text-sm space-x-3 justify-between'>
        <span className='text-sm'>Don't have an account?</span> <Button asChild variant={'outline'}><Link href={'/register'}>Sig Up</Link></Button>
      </div>
    </div>
  )
}