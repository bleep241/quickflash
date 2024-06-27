"use client"

import { Category } from '@prisma/client'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import { Toggle } from '@/components/ui/toggle'
import { Shuffle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const PracticeSession = ({ categories }: { categories: Category[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [shuffle, setShuffle] = useState(false);

  return (
    <div className='flex flex-col items-center justify-start p-10'>
      <Card>
        <CardContent className='flex items-center p-6 gap-6'>
          <Select defaultValue={categories[0].slug} value={selectedCategory?.slug} onValueChange={(slug) => setSelectedCategory(categories.find((c) => c.slug === slug)!)}>
            <SelectTrigger className='max-w-[300px]'>
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
            <TooltipTrigger>
              <Toggle variant="outline" aria-label='Toggle shuffle'>
                <Shuffle className='size-4' />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Shuffle</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  )
}

export default PracticeSession