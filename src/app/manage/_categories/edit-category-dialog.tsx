import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Category } from '@prisma/client'
import React from 'react'
import { editCategory } from '../actions'
import { useToast } from '@/components/ui/use-toast'
import slugify from 'slugify'

const EditCategory = ({ category, children }: {
  category: Category,
  children: React.ReactNode
}) => {
  const { toast } = useToast();

  let oldCategoryName = category.name;

  const handleEditCategory = async (formData: FormData) => {
    console.log('formdata is:', formData.get("name"));
    const newCategoryName = formData.get("name");
    const slug = slugify(newCategoryName as string, { lower: true });
    await editCategory({
      id: category.id,
      data: {
        name: newCategoryName as string,
        slug: slug,
      }
    });
    toast({
      title: `Category "${oldCategoryName}" successfully updated to ${newCategoryName}!`,
      variant: "default",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className='gap-6'>
        <DialogHeader>
          <DialogTitle>Edit {category.name}</DialogTitle>
        </DialogHeader>
        <form action={handleEditCategory} id='create-category' className=''>
          <div className='grid gap-2'>
            <Label>Name</Label>
            <Input id='name' name='name' placeholder={category.name} defaultValue={category.name} />
          </div>
        </form>
        <DialogFooter>
          <DialogClose>
            <Button form='create-category' type='submit'>
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCategory