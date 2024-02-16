"use client"
import { usePathname } from 'next/navigation'
import GridTable from '../../../components/generic/gridtable'
import "../../styles.css"

export default function Building() {

  // Navigation
  // const { id } = useParams()
  // let address = "Building/" + id + "/Edit"

  const pathname = usePathname()

  const blank = { 
    title: '',
    fontBold: false,
    fontItalic: false,
    fontSize: 1,
    bg: '#ffd9b3',
    bdrL: false,
    bdrT: false,
    bdrR: false,
    bdrB: false,
    bdrStyle: 'solid'
  }

  // ----- Main Return -----
  return (
    <>
      <h3>{pathname}</h3>

      <GridTable data={[[blank]]}/>

    </>
  )
}