import { faker } from '@faker-js/faker'

export function generateCategories(count: number): string[] {
  return Array.from({ length: count }, () => faker.commerce.department())
}