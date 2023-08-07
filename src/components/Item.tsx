import { cn } from '@/lib/utils'
import React from 'react'

interface ItemProps {
  title: string
  children: React.ReactNode
  className?: string
}

const Item: React.FC<ItemProps> = ({ title, children, className }) => {
  return (
    <div
      className={cn(
        'relative border-[12px] border-primary rounded-3xl sm:w-3/4 w-full sm:h-[70vh] p-10 sm:p-2 flex flex-col gap-2 ',
        className
      )}
    >
      <div className=" absolute -top-8 whitespace-nowrap  left-1/2 transform -translate-x-1/2  bg-primary text-base-100  text-2xl rounded-full px-6 py-2 pointer-events-none ">
        {title}
      </div>
      {children}
    </div>
  )
}

export default Item
