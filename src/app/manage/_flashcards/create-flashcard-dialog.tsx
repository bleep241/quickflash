import React from 'react'
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
import { Combobox } from '@/components/Combobox'


const CreateFlashcard = ({ categories }: { categories: Category[] }) => {
  const comboboxData = categories.map(category => ({
    value: category.name,
    label: category.name,
  }));

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
            <Input id='question' name='question' placeholder='e.g. What is JavaScript?' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='answer'>Answer</Label>
            <Textarea id='answer' name='answer' placeholder='e.g. JavaScript is a programming language.' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='answer'>Add to category</Label>
            <Combobox placeholder='Select category' data={comboboxData}/>
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