import { Zap, SwatchBook, Menu } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <nav className='z-[999] inset-x-0 top-0 sticky bg-blue-900 w-full mx-auto h-16 flex justify-center'>
      <ul className='flex justify-between items-center w-[80%] border-2 border-red-900 text-white'>
        <Link href={'#'} className='flex'><Zap className='size-10'/><SwatchBook className={'size-10'}/></Link>
        <div className='w-[30%] hidden md:flex justify-end gap-x-10 text-lg'>
          <Link href={'#'}>Study</Link>
          <Link href={'#'}>Create</Link>
          <Link href={'#'}>Login</Link>
        </div>
          <Menu className='size-10 block md:hidden'/>
      </ul>
    </nav>
  )
}

export default Navbar