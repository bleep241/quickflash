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
import { useToast } from '@/components/ui/use-toast'
import { deleteFlashcard } from '../actions'

const ConfirmDelete = ({ flashcard, children }: { flashcard: FlashcardColumn, children: React.ReactNode }) => {
  const {toast} = useToast();

  const handleDeleteFlashcard = async () => {
    const response = await deleteFlashcard(flashcard.id);
    toast({
      title: `Flashcard ${flashcard.question} successfully deleted!`
    });

    console.log('response', response);
  }

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
          <AlertDialogAction onClick={handleDeleteFlashcard} className='bg-destructive hover:bg-destructive/80'>
          Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default ConfirmDelete