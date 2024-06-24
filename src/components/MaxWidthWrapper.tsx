import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper = ({className, children}: Props) => {
  return (
    <div className={cn("h-full mx-auto w-full max-w-screen-2xl px-2.5 md:px-20 border-red-900 border-2", className)}>
      {children}
    </div>
  )
}

export default MaxWidthWrapper