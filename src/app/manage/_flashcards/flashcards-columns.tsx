"use client"

import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Flashcard, Category } from '@prisma/client';
import { MoreHorizontal } from "lucide-react";
import EditFlashcard from "./edit-flashcard-dialog";
import ConfirmDelete from "./confirm-flashcard-delete";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type FlashcardColumn = Omit<Flashcard, 'categoryId'> & {
  category: Category;
};

export const generateFlashcardsColumns: (categories: Category[]) => ColumnDef<FlashcardColumn>[] = (categories) => ([
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'question',
    header: 'Question'
  },
  {
    accessorKey: 'answer',
    header: 'Answer',
    cell: ({ getValue }) => (
      <p>
        {getValue() as string}
      </p>
    )
  },
  {
    accessorKey: 'slug',
    header: 'Slug'
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const flashcard = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditFlashcard categories={categories} flashcard={flashcard}>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => e.preventDefault()}>
                Edit
              </DropdownMenuItem>
            </EditFlashcard>
            <ConfirmDelete flashcard={flashcard}>
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive/80"
                onSelect={(e) => e.preventDefault()}>
                Delete
              </DropdownMenuItem>
            </ConfirmDelete>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]);
