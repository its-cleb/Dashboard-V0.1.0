"use client"
import './DeletePlantButton.css'
import { useRouter } from 'next/navigation'
import { MdDeleteForever } from "react-icons/md"

export default function DeletePlantButton({plantId}){
  
  const router = useRouter()

  async function handleClick(){
    try {
      fetch(`/api/plant/delete-plant/${plantId}`, {
        method: 'DELETE'
      })
      window.location.reload(false)
    } catch(e) {
      console.error(e)
      window.location.reload(false)
    }
  }

  return (
    <div className="delete-button flex center-all cursor-pointer" onClick={handleClick}>
      <MdDeleteForever color="white" className="delete-button-icon flex center-all" size={22}/>
    </div>
  )
}