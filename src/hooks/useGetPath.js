"use client"
import { usePathname } from 'next/navigation'

function useGetPath() {
  
  const path = usePathname()

  return (path)
}


function useGetPathEnd() {
  
  // Extract User ID from URL Path
  const path = usePathname()
  const pathEnd = path.split("/").pop()

  return (pathEnd)
}


export { useGetPath, useGetPathEnd }