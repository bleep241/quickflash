import { Category } from '@prisma/client'
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteCategory } from '../actions';
import { useToast } from '@/components/ui/use-toast';

const ConfirmDelete = ({ category, children }: { category: Category, children: React.ReactNode }) => {
  const {toast} = useToast();

  console.log('category in delete:', category);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure you want to delete the &quot;{category.name}&quot; category?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the category and its associated flashcards.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            deleteCategory(category.id);
            toast({
              title: `Category "${category.name}" has been deleted.`,
              variant: "destructive",
            });
            }} className='bg-destructive hover:bg-destructive/80'>
          Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default ConfirmDelete