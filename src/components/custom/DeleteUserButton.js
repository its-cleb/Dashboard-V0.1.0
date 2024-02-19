"use client"
import './DeleteUserButton.css'
import { useRouter } from 'next/navigation'

export default function DeleteUserButton({userId}){
  
  const router = useRouter()

  async function handleClick(){
    try {
      await fetch(`/api/user/${userId}`, {
        method: 'DELETE'
      })
      router.refresh
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div className="delete-button" onClick={handleClick}>Delete User</div>
  )
}