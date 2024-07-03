"use client";

import { Category, Flashcard } from '@prisma/client';
import React, { useEffect, useMemo, useState } from 'react'
import { shuffleArray } from '../../../utils/shuffle';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowBigRight, RotateCcw } from 'lucide-react';
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
  const displayedFlashcards = useMemo(() => shuffleArray(flashcards), [flashcards]);
  const [answerShown, setAnswerShown] = useState(false);

  const handleNextStep = () => {
    if (step === displayedFlashcards.length - 1) {
      setAnswerShown(false);
      setStep(0);
      return
    }
    setAnswerShown(false);
    setStep((s) => s + 1);
  };

  useEffect(() => {
    setStep(0);
    setAnswerShown(false);
  }, [category])

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>
          {displayedFlashcards[step].question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion
          value={answerShown ? displayedFlashcards[step].slug : undefined}
          onValueChange={(value) => setAnswerShown(!!value)}
          type='single' collapsible>
          <AccordionItem value={displayedFlashcards[step].slug}>
            <AccordionTrigger>
              Reveal answer
            </AccordionTrigger>
            <AccordionContent>
              {answerShown && displayedFlashcards[step].answer}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className='justify-between'>
        <div>
          {step + 1} / {displayedFlashcards.length}
        </div>
        <Button onClick={handleNextStep} disabled={!answerShown} variant="outline" size="icon">
          {step === displayedFlashcards.length - 1 ?
           (
            <RotateCcw />
           ) : (
            <ArrowBigRight />
          )}
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