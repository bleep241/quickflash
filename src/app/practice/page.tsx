
import prisma from '@/lib/db'
import React from 'react'
import PracticeSession from './PracticeSession'

type Props = {}

const Practice = async (props: Props) => {
  const categories = await prisma.category.findMany();

  return (
    <PracticeSession categories={categories}/>
  )
}

export default Practice