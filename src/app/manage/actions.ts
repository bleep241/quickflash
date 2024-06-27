"use server"

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createCategory({
  name,
  slug,
}:
  Prisma.CategoryCreateInput) {
  const existingCategory = await prisma.category.findUnique({
    where: {
      slug,
    }
  });

  if (existingCategory) {
    return {
      error: `The category "${name}" already exists!`
    }
  }

  const createdCategory = await prisma.category.create({
    data: {
      name,
      slug,
    }
  });

  revalidatePath('/manage');
  return { createdCategory }
};

export async function editCategory({ id, data }: {
  id: number;
  data: Prisma.CategoryUpdateInput,
}) {
  try {
    await prisma.category.update({
      where: {
        id,
      },
      data
    })
  } catch (error) {
    console.error('There was an error editing the category:', error);
  }

  revalidatePath('/manage');
};

export async function deleteCategory(id: number) {
  try {
    await prisma.category.delete({
      where: {
        id
      }
    });
  } catch (error) {
    console.error('There was an error deleting the category:', error);
  }

  revalidatePath('/manage');
};

export async function createFlashcard({
  question,
  answer,
  slug,
  category,
}: {
  question: string
  answer: string
  slug: string
  category: number
}) {
  if (!question) {
    return {
      error: 'Question is required',
    }
  }

  if (!answer) {
    return {
      error: 'Answer is required',
    }
  }

  if (!category) {
    return {
      error: 'Category is required',
    }
  }

  const existingCategory = await prisma.category.findUnique({
    where: {
      id: category,
    }
  });

  if (!existingCategory) {
    return {
      error: 'Category is not found'
    }
  }

  const createdFlashcard = await prisma.flashcard.create({
    data: {
      question,
      answer,
      slug,
      category: {
        connect: {
          id: category,
        }
      }
    }
  });

  revalidatePath('/manage');
  return { createdFlashcard };
}

export async function updateFlashcard({
  flashcardId,
  question,
  answer,
  slug,
  category,
}: {
  flashcardId: number
  question: string
  answer: string
  slug: string
  category: number
}) {
  if (!question) {
    return {
      error: 'Question is required',
    }
  }

  if (!answer) {
    return {
      error: 'Answer is required',
    }
  }

  if (!category) {
    return {
      error: 'Category is required',
    }
  }

  const existingCategory = await prisma.category.findUnique({
    where: {
      id: category,
    }
  });

  if (!existingCategory) {
    return {
      error: 'Category is not found'
    }
  }

  const updatedFlashcard = await prisma.flashcard.update({
    where: {
      id: flashcardId,
    },
    data: {
      question,
      answer,
      slug,
      category: {
        connect: {
          id: category,
        }
      }
    }
  });

  revalidatePath('/manage');
  return { updatedFlashcard };
}

export async function deleteFlashcard(id: number) {
  try {
    await prisma.flashcard.delete({
      where: {
        id
      }
    });
  } catch (error) {
    console.error('There was an error deleting the category:', error);
  }

  revalidatePath('/manage');
}