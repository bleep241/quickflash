"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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


const CreateFlashcard = ({ categories }: { categories: Category[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const comboboxData = categories.map((category) => ({ label: category.name, value: category.slug }))

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-6'>
        <DialogHeader>
          <DialogTitle>Create a new flashcard</DialogTitle>
        </DialogHeader>
        <form id='create-flashcard' className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='question'>Question</Label>
            <Input id='question' name='question' placeholder='e.g. What is JavaScript?' required/>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='answer'>Answer</Label>
            <Textarea id='answer' name='answer' placeholder='e.g. JavaScript is a programming language.' required/>
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