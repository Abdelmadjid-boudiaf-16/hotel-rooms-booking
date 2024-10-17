'use client'
import { handleSignOut } from '@/actions'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'

const dashboard = () => {
  const {data:session} = useSession()
  return (
    <div className='flex items-center flex-col justify-center min-h-screen gap-4 '>
      <h1> Welcom {session?.user?.name} </h1>
      <div>
        <form action={handleSignOut}>
          <Button>Sign Out</Button>
        </form>
      </div>
    </div>
  )
}

export default dashboard