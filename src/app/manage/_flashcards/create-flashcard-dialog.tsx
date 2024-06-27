"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Category } from '@prisma/client'
import { Textarea } from '@/components/ui/textarea'
import { CategorySelect } from './category-select'
import slugify from 'slugify'
import { createFlashcard } from '../actions'
import { useToast } from '@/components/ui/use-toast'


const CreateFlashcard = ({ categories }: { categories: Category[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories.length > 0 ? categories[0] : { id: 0, name: 'Default', slug: 'default' });

  const comboboxData = categories.map((category) => ({ label: category.name, value: category.slug }));
  
  const { toast } = useToast();

  const handleCreateFlashcard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newData = new FormData(event.currentTarget);
    const question = newData.get("question") as string;
    const answer = newData.get("answer") as string;
    const category = parseInt(newData.get("category") as string);
    const slug = slugify(question, { lower: true });

    const newFlashcard = await createFlashcard({
      question,
      answer,
      slug,
      category
    });

    if (newFlashcard.error) {
      toast({
        title: `${newFlashcard.error}`,
      });
    } else {
      toast({
        title: `New flashcard successfully created!`,
      });
      setIsDialogOpen(false);
    }
  };


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-6'>
        <DialogHeader>
          <DialogTitle>Create a new flashcard</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateFlashcard} id='create-flashcard' className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='question'>Question</Label>
            <Input id='question' name='question' placeholder='e.g. What is JavaScript?' required />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='answer'>Answer</Label>
            <Textarea id='answer' name='answer' placeholder='e.g. JavaScript is a programming language.' required />
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
              defaultValue={{ label: selectedCategory.name, value: selectedCategory.slug }}
              onSelect={(slug) =>
                setSelectedCategory(categories.find((c) => c.slug === slug)!)
              }
              categories={comboboxData}
            />
          </div>
        </form>
        <DialogFooter>
          <Button form='create-flashcard' type='submit'>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateFlashcard