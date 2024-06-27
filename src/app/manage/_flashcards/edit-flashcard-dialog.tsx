"use client"

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Category } from '@prisma/client'
import React, { useState } from 'react'
import { CategorySelect } from './category-select'
import { FlashcardColumn } from './flashcards-columns'
import slugify from 'slugify'
import { updateFlashcard } from '../actions'
import { useToast } from '@/components/ui/use-toast'


const EditFlashcard = ({ flashcard, categories, children }: { 
  flashcard: FlashcardColumn
  categories: Category[] 
  children: React.ReactNode
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(flashcard.category);

  const comboboxData = categories.map((category) => ({ label: category.name, value: category.slug }));

  const { toast } = useToast();

  const handleUpdateFlashcard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData = new FormData(event.currentTarget);
    const question = newData.get("question") as string;
    const answer = newData.get("answer") as string;
    const category = parseInt(newData.get("category") as string);
    const slug = slugify(question, { lower: true });

    const updatedFlashcard = await updateFlashcard({
      flashcardId: flashcard.id,
      question,
      answer,
      slug,
      category
    });

    if (updatedFlashcard.error) {
      toast({
        title: `${updatedFlashcard.error}`,
      });
    } else {
      toast({
        title: `Flashcard successfully updated!`,
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='gap-6'>
        <DialogHeader>
          <DialogTitle>Edit {flashcard.question}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdateFlashcard} id='update-flashcard' className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='question'>Question</Label>
            <Input id='question' name='question' placeholder={flashcard.question} defaultValue={flashcard.question} required/>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='answer'>Answer</Label>
            <Textarea id='answer' name='answer' placeholder={flashcard.answer} defaultValue={flashcard.answer} required/>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='answer'>Add to category</Label>
            <input
              name="category"
              readOnly
              type='text'
              hidden
              aria-hidden
              aria-readonly
              value={selectedCategory.id}
              className='hidden'
            />
            <CategorySelect
            defaultValue={{label: selectedCategory.name, value: selectedCategory.slug}}
              onSelect={(slug) =>
                setSelectedCategory(categories.find((c) => c.slug === slug)!)
              }
              categories={comboboxData}
            />
          </div>
        </form>
        <DialogFooter>
          <Button form='update-flashcard' type='submit'>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditFlashcard