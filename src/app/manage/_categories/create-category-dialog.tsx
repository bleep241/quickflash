"use client"

import React from 'react'
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
import slugify from 'slugify'
import { createCategory } from '../actions'
import { useToast } from '@/components/ui/use-toast'
import { DialogClose } from '@radix-ui/react-dialog'

const CreateCategory = () => {
  const { toast } = useToast();

  const handleCreateCategory = async (formData: FormData) => {
    const newCategoryName = formData.get("name");
    const slug = slugify(newCategoryName as string, { lower: true });
    const res = await createCategory({ name: newCategoryName as string, slug });

    if (res.error) {
      toast({
        title: `${res.error}`,
        variant: "destructive",
      });
    } else {
      toast({
        title: `Category "${newCategoryName}" successfully added!`,
        variant: "default",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' size='icon'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='gap-6'>
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>
        </DialogHeader>
        <form action={handleCreateCategory} id='create-category' className=''>
          <div className='grid gap-2'>
            <Label>Name</Label>
            <Input id='name' name='name' placeholder='e.g. JavaScript' required />
          </div>
        </form>
        <DialogFooter>
          <DialogClose>
            <Button form='create-category' type='submit'>
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCategory