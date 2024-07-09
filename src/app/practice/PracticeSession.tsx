"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Category } from '@prisma/client';
import { Loader2, Play } from 'lucide-react';
import { Suspense, useState } from 'react';
import Flashcards from './Flashcards';

const Practice = ({ categories }: { categories: Category[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [sessionStarted, setSessionStarted] = useState(false);

  return (
    <div className='flex flex-col items-center justify-start p-10 gap-12'>
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

        </CardContent>
      </Card>
      {sessionStarted ? (
        <Suspense fallback={<Loader2 className='animate-spin' />}>
          <Flashcards category={selectedCategory} />
        </Suspense >
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label='Toggle shuffle' variant='outline' onClick={() => setSessionStarted(true)}>
                <Play className='size-4 mr-2' />
                Start practice session
              </Button>
            </TooltipTrigger>
            <TooltipContent>Practice</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
};

export default Practice;