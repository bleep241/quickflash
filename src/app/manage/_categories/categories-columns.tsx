"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Category } from '@prisma/client'
import { MoreHorizontal } from "lucide-react"
import EditCategory from "./edit-category-dialog"
import ConfirmDelete from "./confirm-category-delete"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const categoriesColumns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <EditCategory category={category}>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => e.preventDefault()}>
                Edit
              </DropdownMenuItem>
            </EditCategory>
            <ConfirmDelete category={category}>
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive/80"
                onSelect={(e) => e.preventDefault()}
              >
                Delete
              </DropdownMenuItem>
            </ConfirmDelete>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
