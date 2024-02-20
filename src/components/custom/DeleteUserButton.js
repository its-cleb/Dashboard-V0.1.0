"use client"
import './DeleteUserButton.css'
import { useRouter } from 'next/navigation'
import { MdDeleteForever } from "react-icons/md";

export default function DeleteUserButton({userId}){
  
  const router = useRouter()

  async function handleClick(){
    try {
      await fetch(`/api/delete-user/${userId}`, {
        method: 'DELETE'
      })
      router.refresh
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <div className="delete-button flex center-all cursor-pointer" onClick={handleClick}>
      <MdDeleteForever color="white" className="delete-button-icon flex center-all" size={22}/>
    </div>
  )
}