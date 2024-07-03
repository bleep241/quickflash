"use client";

import { Category, Flashcard } from '@prisma/client';
import React, { useState } from 'react'
import { shuffleArray } from '../../../utils/shuffle';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowBigRight } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';

function Flashcards({ category }: { category: Category }) {
  const { data } = useSuspenseQuery({
    queryKey: [`${category.slug}-flashcards`],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${category.id}/flashcards`);
      return response.json();
    }
  });

  const flashcards = data.flashcards as Flashcard[];

  const [step, setStep] = useState(0);

  console.log("shuffled?", flashcards);

  const displayedFlashcards = shuffleArray(flashcards);

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>
          {displayedFlashcards[step].question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type='single' collapsible>
          <AccordionItem value={displayedFlashcards[step].slug}>
            <AccordionTrigger>
              Reveal answer
            </AccordionTrigger>
            <AccordionContent>
              {displayedFlashcards[step].answer}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="icon">
          <ArrowBigRight />
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Flashcards


{/* <TooltipProvider>
<Tooltip>
  <TooltipTrigger asChild>
    <Toggle variant="outline" pressed={shuffle} onPressedChange={setShuffle} defaultChecked={shuffle} className={cn({ 'bg-gray-300': shuffle }, "hover:bg-gray-300")} aria-label='Toggle shuffle'>
      <Shuffle className='size-4' />
    </Toggle>
  </TooltipTrigger>
  <TooltipContent>Shuffle</TooltipContent>
</Tooltip>
</TooltipProvider> */}