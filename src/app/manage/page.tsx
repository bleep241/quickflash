import { Category } from '@prisma/client'
import React, { useMemo } from 'react'
import { FlashcardColumn, generateFlashcardsColumns } from './_flashcards/flashcards-columns';
// import { DataTable } from './data-table';
import { CategoriesDataTable } from './_categories/categories-data-table';
import { FlashcardsDataTable } from './_flashcards/flashcards-data-table';
import { categoriesColumns } from './_categories/categories-columns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CreateCategory from './_categories/create-category-dialog';
import CreateFlashcard from './_flashcards/create-flashcard-dialog';
import prisma from '@/lib/db';


const Manage = async () => {
  const flashcards = await prisma.flashcard.findMany({
    include: {
      category: true,
    }
  });

  const categories = await prisma.category.findMany();

  return (
    <div className='flex flex-col md:flex-row gap-6 p-10'>
      <div>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center'>
            <span className='font-bold text-3xl'>Categories</span> <CreateCategory />
          </CardHeader>
          <CardContent>
            <CategoriesDataTable categories={categories} />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader className='flex flex-row justify-between items-center'>
            <span className='font-bold text-3xl'>Flashcards</span> <CreateFlashcard categories={categories} />
          </CardHeader>
          <CardContent>
            <FlashcardsDataTable categories={categories} flashcards={flashcards} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Manage