"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { generateCategories } from "@/lib/faker"
import { Toaster, toast } from "sonner"

const ITEMS_PER_PAGE = 6
const TOTAL_ITEMS = 100
const VISIBLE_PAGES = 7

export default function Home() {
  const [allCategories, setAllCategories] = useState<string[]>([])
  const [displayedCategories, setDisplayedCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE)

  const generatePageCategories = useCallback((page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    // @ts-ignore
    return generateCategories(ITEMS_PER_PAGE, startIndex)
  }, [])

  useEffect(() => {
    // Generate all categories
    const categories = generateCategories(TOTAL_ITEMS)
    setAllCategories(categories)

    // Set initial displayed categories
    setDisplayedCategories(generatePageCategories(1))

    // Fetch user's selected categories from the backend
    const savedCategories = localStorage.getItem("selectedCategories")
    if (savedCategories) {
      setSelectedCategories(JSON.parse(savedCategories))
    }
  }, [generatePageCategories])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setDisplayedCategories(generatePageCategories(page))
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }

  const handleSave = () => {
    // In a real application, you would send this data to your backend
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    )
    toast.success("Interests saved successfully!")
  }

  const getPageRange = () => {
    const halfVisible = Math.floor(VISIBLE_PAGES / 2)
    let start = Math.max(currentPage - halfVisible, 1)
    let end = Math.min(start + VISIBLE_PAGES - 1, totalPages)

    if (end - start + 1 < VISIBLE_PAGES) {
      start = Math.max(end - VISIBLE_PAGES + 1, 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const pageRange = getPageRange()

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader className="border-b">
          <h1 className="text-2xl font-bold text-center">
            Please mark your interests!
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            We will keep you notified
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {displayedCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4">
          <Pagination className="cursor-pointer">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  // @ts-ignore
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {pageRange[0] > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              )}
              {pageRange.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {pageRange[pageRange.length - 1] < totalPages && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  // @ts-ignore
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <Button onClick={handleSave} className="w-full">
            Save Interests
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}