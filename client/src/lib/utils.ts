import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  })
}

export function formatDateRange(startDate: Date | string, endDate?: Date | string | null) {
  const start = formatDate(startDate)
  if (!endDate) return `${start} - Present`
  const end = formatDate(endDate)
  return `${start} - ${end}`
}