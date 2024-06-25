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

type Props = {}

const EditCategory = ({category, children}: {category: Category, children: React.ReactNode}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='gap-6'>
        <DialogHeader>
          <DialogTitle>Edit {category.name}</DialogTitle>
        </DialogHeader>
        <form id='create-category' className=''>
          <div className='grid gap-2'>
            <Label>Name</Label>
            <Input id='name' name='name' placeholder={category.name} defaultValue={category.name}/>
          </div>
        </form>
        <DialogFooter>
          <Button form='create-category' type='submit'>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCategory