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

type Props = {}

const CreateCategory = (props: Props) => {
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
        <form id='create-category' className=''>
          <div className='grid gap-2'>
            <Label>Name</Label>
            <Input id='name' name='name' placeholder='e.g. JavaScript' required/>
          </div>
        </form>
        <DialogFooter>
          <Button form='create-category' type='submit'>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCategory