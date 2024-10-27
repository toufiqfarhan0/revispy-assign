"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { generateCategories } from "@/lib/faker"
import { Toaster, toast } from "sonner"

const ITEMS_PER_PAGE = 6


export default function Home() {
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const allCategories = generateCategories(100)
    setCategories(allCategories)

    // Fetch user's selected categories from the backend
    const savedCategories = localStorage.getItem("selectedCategories")
    if (savedCategories) {
      setSelectedCategories(JSON.parse(savedCategories))
    }
  }, [])

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

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const displayedCategories = categories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

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
          <div className="flex justify-between items-center w-full">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Interests
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}