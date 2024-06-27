import React from 'react'
import { Flashcard } from '@/app/page'

const CardContainer = ({isLoading, flashcards}: {isLoading: boolean, flashcards: Flashcard[]}) => {
  return (
    <>
    <div className='flex flex-col items-center justify-center gap-5'>
     {flashcards.map((card) => {
      return (
        <div className='flex flex-col gap-2 justify-center items-center'>
          <p>{`front: ${card.front}`}</p>
          <p>{`back: ${card.back}`}</p>
        </div>
      )
     })}
    </div>
    </>
  )
}

export default CardContainer