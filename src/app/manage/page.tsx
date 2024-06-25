import { Category } from '@prisma/client'
import React from 'react'
import { FlashcardColumn, flashcardsColumns } from './_flashcards/flashcards-columns';
import { DataTable } from './data-table';
import { categoriesColumns } from './_categories/categories-columns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import CreateCategory from './_categories/create-category-dialog';
import CreateFlashcard from './_flashcards/create-flashcard-dialog';

type Props = {}

const Manage = (props: Props) => {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Javascript',
      slug: 'javascript',
    },
    {
      id: 2,
      name: 'HTML',
      slug: 'html',
    },
    {
      id: 3,
      name: 'React',
      slug: 'react',
    },
    {
      id: 4,
      name: 'CSS',
      slug: 'css',
    },
    {
      id: 5,
      name: 'Behavioral',
      slug: 'behavioral',
    },
    {
      id: 6,
      name: 'Nextjs',
      slug: 'nextjs',
    },
  ];

  const flashcards: FlashcardColumn[] = [
    {
      id: 1,
      question: 'What is JS',
      answer: 'it is a programming language',
      category: categories[0],
      slug: 'what-is-js',
    },
    {
      id: 2,
      question: 'What is html',
      answer: 'hypertext markup language',
      category: categories[1],
      slug: 'what-is-js',
    },
    {
      id: 3,
      question: 'What is react',
      answer: 'frontend framework',
      category: categories[2],
      slug: 'what-is-js',
    },
    {
      id: 4,
      question: 'What is css',
      answer: 'cascading stylesheets',
      category: categories[3],
      slug: 'what-is-js',
    },
    {
      id: 5,
      question: 'What is a flaw of yours',
      answer: 'i try to juggle learning too many things at once',
      category: categories[4],
      slug: 'what-is-js',
    },
    {
      id: 6,
      question: 'What is nextjs',
      answer: 'it is a framework for react',
      category: categories[5],
      slug: 'what-is-js',
    },
  ];

  return (
    <div className='flex flex-col md:flex-row gap-6 p-16'>
      <Card>
        <CardHeader className='flex flex-row justify-between items-center'>
          <span className='font-bold text-3xl'>Categories</span> <CreateCategory />
        </CardHeader>
        <CardContent>
          <DataTable columns={categoriesColumns} data={categories} />
        </CardContent>
      </Card>
      <Card>
      <CardHeader className='flex flex-row justify-between items-center'>
          <span className='font-bold text-3xl'>Flashcards</span> <CreateFlashcard categories={categories} />
        </CardHeader>
        <CardContent>
      <DataTable columns={flashcardsColumns} data={flashcards} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Manage