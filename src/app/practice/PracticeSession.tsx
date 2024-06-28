"use client"

import { Category } from '@prisma/client'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import { Toggle } from '@/components/ui/toggle'
import { Play, Shuffle, SquarePlay } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const Practice = ({ categories }: { categories: Category[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [shuffle, setShuffle] = useState(false);

  return (
    <div className='flex flex-col items-center justify-start p-10'>
      <Card>
        <CardContent className='flex items-center p-6 gap-6'>
          <Select defaultValue={categories[0].slug} value={selectedCategory?.slug} onValueChange={(slug) => setSelectedCategory(categories.find((c) => c.slug === slug)!)}>
            <SelectTrigger className='w-[300px]'>
              <SelectValue placeholder="Select a category..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={`${category.slug}`}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle variant="outline" pressed={shuffle} onPressedChange={setShuffle} defaultChecked={shuffle} className={cn({'bg-gray-300': shuffle}, "hover:bg-gray-300")} aria-label='Toggle shuffle'>
                  <Shuffle className='size-4' />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Shuffle</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button aria-label='Toggle shuffle' size="icon" variant='outline'>
                  <Play className='size-4'/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Practice</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  )
}

export default Practice