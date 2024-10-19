import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const HotelsPage = () => {
  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1>Hotels</h1>
        <Button variant={'outline'} asChild><Link href={'/admin/hotels/add'}>Add Hotel</Link></Button>
      </div>
    </div>
  )
}

export default HotelsPage