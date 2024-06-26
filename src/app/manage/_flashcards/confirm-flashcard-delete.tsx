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
import { FlashcardColumn } from './flashcards-columns'

const ConfirmDelete = ({ flashcard, children }: { flashcard: FlashcardColumn, children: React.ReactNode }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure you want to delete this flashcard: &quot;{flashcard.question}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the flashcard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-destructive hover:bg-destructive/80'>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default ConfirmDelete