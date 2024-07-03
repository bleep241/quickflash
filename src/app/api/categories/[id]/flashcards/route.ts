import prisma from "@/lib/db";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const categoryId = parseInt(params.id);
  const category = await prisma.category.findUnique({
    where:
    {
      id: categoryId
    }
  });

  if (!category) {
    return Response.json(
      {
        error: 'Category not found',
      },
      { status: 404, }
    );
  }

  const flashcards = await prisma.flashcard.findMany({
    where: {
      categoryId
    }
  });

  return Response.json({
    category,
    flashcards,
  });
}