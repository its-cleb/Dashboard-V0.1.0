"use client"
import { useState, useEffect } from 'react'
import { Section } from "./card"
import { TbArrowAutofitRight, TbArrowAutofitDown } from "react-icons/tb"
import { BsThreeDots } from "react-icons/bs"
import { VscTextSize } from "react-icons/vsc"
import { TbTextSize } from "react-icons/tb"
import { CgBorderBottom, CgBorderTop, CgBorderLeft, CgBorderRight, CgBorderStyleDashed, CgBorderStyleSolid } from "react-icons/cg"
import { LuZoomIn, LuZoomOut, LuMinusCircle, LuPlusCircle  } from "react-icons/lu"
import { MdFormatBold, MdFormatItalic, MdOutlineExitToApp  } from "react-icons/md"
import { FaUndoAlt } from "react-icons/fa"
import { AiOutlineSave } from "react-icons/ai"
import { Tooltip } from "./common"
import { BottomMenu } from '../navigation/bottommenu'
import "../../app/styles.css"
import "./gridtable.css"

const GridTable = (props) => {

  // Props
  const isView = !props.viewMode
  const hasData = Boolean(props.data === undefined) ? false : true

  // Grid State
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

  const data = hasData ? props.data : [[blank]]
  const [ grid, setGrid ] = useState(data)

  const [ columns, setColumns ] = useState(grid[0].length)
  const [ rows, setRows ] = useState(grid.length)
  const [ cell, setCell ] = useState({row: 0, column: 0})
  const [ cellSize, setCellSize ] = useState(20)
  const [ borderSize, setBorderSize ] = useState(1)
 
  useEffect(() => {
    setColumns(grid[0].length)
    setRows(grid.length)
  }, [grid])

  // Row Functions
  const rowsMinus = () => {
    if (rows > 1) {
      const copiedGrid = grid.slice()
      copiedGrid.pop()
      setGrid(copiedGrid)
    }
  }
  const rowsPlus = () => {
    if (columns < 100) {
      const copiedGrid = grid.slice()
      let newRow = []
      for (let i = 0; i < columns; i++) {
        newRow.push({...blank})
      }
      copiedGrid.push([...newRow])
      setGrid(copiedGrid)
    }
  }
  const columnsMinus = () => {
    if (columns > 1) {
      const copiedGrid = grid.slice()
      copiedGrid.forEach((e) => e.pop())
      setGrid(copiedGrid)
    }
  }
  const columnsPlus = () => {
    if (columns < 100) {
      const copiedGrid = grid.slice()
      copiedGrid.forEach((e) => e.push({...blank}))
      setGrid(copiedGrid)
    }
  }

  // Cell Styles
  const cellSelected = (cellRow, cellColumn) => {
    let cellStyle
    if (cellRow === cell.row && cellColumn === cell.column) {
      isView ?
        cellStyle = "cell select-cell"
        :
        cellStyle = "cell-view"
    } else {
      isView ?
        cellStyle = "cell"
        :
        cellStyle = "cell-view"
    }
    return(cellStyle)
  }
  const getBorders = (cellRow, cellColumn, border) => {
    let borders
    switch(border) {
      case 'l':
        borders = (grid[cellRow][cellColumn].bdrL ? "#000000" : (grid[cellRow][cellColumn].bg))
        break
      case 't':
        borders = (grid[cellRow][cellColumn].bdrT ? "#000000" : (grid[cellRow][cellColumn].bg))
        break
      case 'r':
        borders = (grid[cellRow][cellColumn].bdrR ? "#000000" : (grid[cellRow][cellColumn].bg))
        break
      case 'b':
        borders = (grid[cellRow][cellColumn].bdrB ? "#000000" : (grid[cellRow][cellColumn].bg))
        break
    }
    return(borderSize.toString() + "px "+ grid[cellRow][cellColumn].bdrStyle +" " + borders)
  }
  const getFontWeight = (cellRow, cellColumn) => {
   return (grid[cellRow][cellColumn].fontBold ? "bold" : "normal")
  }
  const getFontStyle = (cellRow, cellColumn) => {
    return (grid[cellRow][cellColumn].fontItalic ? "italic" : "normal")
  }
  const getFontSize = (cellRow, cellColumn) => {
    return (grid[cellRow][cellColumn].fontSize + "em ")
  }

  // Cell Editor
  const resetCell = () => {
    const copiedGrid = grid.slice()
    copiedGrid[cell.row][cell.column] = blank
    setGrid(copiedGrid)
  }
  const cellBorder = (side) => {
    const copiedGrid = grid.slice()
    switch(side) {
      case 'l':
        copiedGrid[cell.row][cell.column].bdrL = !copiedGrid[cell.row][cell.column].bdrL
        break
      case 't':
        copiedGrid[cell.row][cell.column].bdrT = !copiedGrid[cell.row][cell.column].bdrT
        break
      case 'r':
        copiedGrid[cell.row][cell.column].bdrR = !copiedGrid[cell.row][cell.column].bdrR
        break
      case 'b':
        copiedGrid[cell.row][cell.column].bdrB = !copiedGrid[cell.row][cell.column].bdrB
        break
    }
    setGrid(copiedGrid)
  }

  const zoomIn = () => {
    if (cellSize < 100) {
      setCellSize(cellSize + 10)
      setBorderSize(borderSize + 1)
    } else { }
  }
  const zoomOut = () => {
    if (cellSize > 10) {
      setCellSize(cellSize - 10)
      setBorderSize(borderSize - 1)
    } else { }
  }
  const cellColor = (color) => {
    const copiedGrid = grid.slice()
    copiedGrid[cell.row][cell.column].bg = color
    setGrid(copiedGrid)
  }
  const cellBorderStyle = (borderStyle) => {
    const copiedGrid = grid.slice()
    copiedGrid[cell.row][cell.column].bdrStyle = borderStyle
    setGrid(copiedGrid)
  }
  const cellText = (text) => {
    const copiedGrid = grid.slice()
    copiedGrid[cell.row][cell.column].title = text
    setGrid(copiedGrid)
  }
  const cellTextBold = () => {
    const copiedGrid = grid.slice()
    copiedGrid[cell.row][cell.column].fontBold = !copiedGrid[cell.row][cell.column].fontBold
    setGrid(copiedGrid)
  }
  const cellTextItalic = () => {
    const copiedGrid = grid.slice()
    copiedGrid[cell.row][cell.column].fontItalic = !copiedGrid[cell.row][cell.column].fontItalic
    setGrid(copiedGrid)
  }
  const cellTextSizePlus = () => {
    const copiedGrid = grid.slice()
    copiedGrid[cell.row][cell.column].fontSize = (copiedGrid[cell.row][cell.column].fontSize + 0.1)
    setGrid(copiedGrid)
  }
  const cellTextSizeMinus = () => {
    const copiedGrid = grid.slice()
    copiedGrid[cell.row][cell.column].fontSize = (copiedGrid[cell.row][cell.column].fontSize - 0.1)
    setGrid(copiedGrid)
  }
  const resetText = () => {
    const copiedGrid = grid.slice()
    copiedGrid[cell.row][cell.column].fontBold = false
    copiedGrid[cell.row][cell.column].fontItalic = false
    copiedGrid[cell.row][cell.column].fontSize = 1
    setGrid(copiedGrid)
  }

  // Bottom Menu
  const revertBackpage = () => {
    setGrid([[blank]]) 
    window.history.back()
  }
  const revertGrid = () => {
    setGrid([[blank]]) 
  }
  const saveGrid = () => {
    console.log("saveGrid")
  }

  // ----- Main Return -----
  return (
    <div className="grid-page">

      {isView ? 
        <div id="control-panel" className="flex-row gap-10 center-justify">
          <Section centeredContent className="center-all">
            <div className="flex-row center-all">
              <div style={{margin: 10}}>
                <div className="bold">Rows</div>
                <div className="pad-b-5">{rows}</div>
                <LuMinusCircle size={20} className="grid-cursor pad-r-5" onClick={rowsMinus} />
                <LuPlusCircle size={20} className="grid-cursor" onClick={rowsPlus} />
              </div>
              <div style={{margin: 10}}>
                <div className="bold">Columns</div>
                <div className="pad-b-5">{columns}</div>
                <LuMinusCircle size={20} className="grid-cursor pad-r-5" onClick={columnsMinus} />
                <LuPlusCircle size={20} className="grid-cursor" onClick={columnsPlus} />
              </div>
            </div>
          </Section>

          <Section centeredContent className="center-all height-max pad-h-10">
              <div className="flex-column height-max center-all stretch flex-grow">
                <div className="flex-row flex-1 center-all mar-b-10">
                  <div className="mar-r-10 bold">Selected Cell:</div>
                  <div className="center-all flex-row mar-r-10">
                    <TbArrowAutofitRight size={19} />
                    <div className="flex center-all" style={{marginLeft: 2}}>{cell.column + 1}</div>
                  </div>  
                  <div className="flex-row center-all">
                    <TbArrowAutofitDown size={19} />
                    <div className="flex center-all" style={{marginLeft: 1}}>{cell.row + 1}</div>
                  </div>  
                </div>
                <div className="flex-row flex-1 center-all">
                  <div className="mar-r-10 bold">Grid Zoom:</div>
                  <LuZoomIn 
                    size={25} 
                    className="cursor mar-l-5 mar-r-10"
                    onClick={zoomIn} 
                  />
                  <LuZoomOut 
                    size={25} 
                    className="cursor mar-l-5"
                    onClick={zoomOut} 
                  />
                </div>
              </div>
          </Section>

          <Section centeredContent className="center-all pad-h-10">
            <div className="flex-row gap-10">
              <div className="grid-container mar-r-5">
                <CgBorderLeft
                  size={30} 
                  className="cursor"
                  style={{gridRowStart: 2, gridRowEnd: 3, gridColumnStart: 1, gridColumnEnd: 2}}
                  onClick={() => cellBorder('l')}
                  color={grid[cell.row][cell.column].bdrL ? '#1166ff' : 'black'}
                />
                <CgBorderTop
                  size={30} 
                  className="cursor"
                  style={{gridRowStart: 1, gridRowEnd: 2, gridColumnStart: 2, gridColumnEnd: 3}}
                  onClick={() => cellBorder('t')}
                  color={grid[cell.row][cell.column].bdrT ? '#1166ff' : 'black'}
                />
                <CgBorderRight
                  size={30} 
                  className="cursor"
                  style={{gridRowStart: 2, gridRowEnd: 3, gridColumnStart: 3, gridColumnEnd: 4}}
                  onClick={() => cellBorder('r')}
                  color={grid[cell.row][cell.column].bdrR ? '#1166ff' : 'black'}
                />
                <CgBorderBottom
                  size={30} 
                  className="cursor"
                  style={{gridRowStart: 3, gridRowEnd: 4, gridColumnStart: 2, gridColumnEnd: 5}}
                  onClick={() => cellBorder('b')}
                  color={grid[cell.row][cell.column].bdrB ? '#1166ff' : 'black'}
                />
              </div>

              <div className="center-all flex-column gap-10">
                <div className="color-box" style={{backgroundColor: '#ff6666'}} onClick={() => cellColor('#ff6666')}></div>
                <div className="color-box" style={{backgroundColor: '#ff6633'}} onClick={() => cellColor('#ff6633')}></div>
                <div className="color-box" style={{backgroundColor: '#ffb84d'}} onClick={() => cellColor('#ffb84d')}></div>
              </div>
              <div className="center-all flex-column gap-10 mar-r-5">
                <div className="color-box" style={{backgroundColor: '#99e600'}} onClick={() => cellColor('#99e600')}></div>
                <div className="color-box" style={{backgroundColor: '#00e6e6'}} onClick={() => cellColor('#00e6e6')}></div>
                <div className="color-box" style={{backgroundColor: '#df80ff'}} onClick={() => cellColor('#df80ff')}></div>
              </div>
              <div className="center-all flex flex-column gap-10 mar-r-5">
                <Tooltip info="Dotted Border">
                  <BsThreeDots  
                    size={24} 
                    className="cursor flex-1 center-all" 
                    onClick={() => cellBorderStyle('dotted')}
                    color={Boolean(grid[cell.row][cell.column].bdrStyle === 'dotted') ? '#1166ff' : 'black'} 
                  />
                </Tooltip>
                <Tooltip info="Dashed Border">
                  <CgBorderStyleDashed 
                    size={24} 
                    className="cursor flex-1" 
                    onClick={() => cellBorderStyle('dashed')}
                    color={Boolean(grid[cell.row][cell.column].bdrStyle === 'dashed') ? '#1166ff' : 'black'} 
                  />
                </Tooltip>
                <Tooltip info="Solid Border">
                  <CgBorderStyleSolid 
                    size={24} 
                    className="cursor flex-1" 
                    onClick={() => cellBorderStyle('solid')}
                    color={Boolean(grid[cell.row][cell.column].bdrStyle === 'solid') ? '#1166ff' : 'black'} 
                  />
                </Tooltip>  
              </div>

              <div className="center-all flex-row gap-10">
                <Tooltip info="Reset Cell to Default">
                  <FaUndoAlt
                    className="cursor" 
                    onClick={resetCell} 
                  />
                </Tooltip>
                
              </div>
            </div>
          </Section>

          <Section centeredContent className="center-all">
            <div className="flex-column pad-h-10 center-all">
              <div className="bold">Cell Text</div>
              <input 
                className="cell-input"
                value={grid[cell.row][cell.column].title}
                onChange={e => cellText(e.target.value)}
              />
              <div className="flex-row center-all mar-t-5">
                <Tooltip info="Bold">
                  <MdFormatBold 
                    size={22} 
                    className="cursor pad-r-5" 
                    onClick={cellTextBold}
                    color={grid[cell.row][cell.column].fontBold ? '#1166ff' : 'black'}
                  />
                </Tooltip>
                <Tooltip info="Italic">
                  <MdFormatItalic 
                    size={22} 
                    className="cursor" 
                    onClick={cellTextItalic}
                    color={grid[cell.row][cell.column].fontItalic ? '#1166ff' : 'black'}
                  />
                </Tooltip>
                <Tooltip info="Shrink Text">
                  <TbTextSize   
                    size={20} 
                    className="cursor mar-l-5" 
                    onClick={cellTextSizeMinus}
                  />
                </Tooltip>  
                <Tooltip info="Enlarge Text">
                  <VscTextSize   
                    size={21} 
                    className="cursor mar-l-5 mar-r-10" 
                    onClick={cellTextSizePlus}
                  />
                </Tooltip>
                <Tooltip info="Reset Text Style to Default">
                  <FaUndoAlt
                    size={14} 
                    className="cursor mar-l-10" 
                    onClick={resetText} 
                  />
                </Tooltip>
              </div>
            </div>
          </Section>
        </div>
        :
        null
      }

      <div className="grid flex-grow center-all pad-10">
        <table className={isView ? "table" : "table-view"}>
          <tbody>
            {grid.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td 
                    style={{backgroundColor: `${grid[i][j].bg}`, width: cellSize, height: cellSize}} 
                    key={j}
                  >
                    <div 
                      className={"cell-text " + cellSelected(i, j)} 
                      onClick={() => setCell({row: i, column: j})}
                      style={{
                        width: cellSize, 
                        height: cellSize, 
                        borderLeft: getBorders(i, j, 'l'),
                        borderTop: getBorders(i, j, 't'),
                        borderRight: getBorders(i, j, 'r'),
                        borderBottom: getBorders(i, j, 'b'),
                        fontWeight: getFontWeight(i, j),
                        fontStyle: getFontStyle(i, j),
                        fontSize: getFontSize(i, j)
                      }}
                    >
                      <span>{grid[i][j].title}</span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isView ?
        <BottomMenu>
          <Tooltip info="Exit Without Saving" className="pad-r-10 border-r-light stretch">
            <MdOutlineExitToApp size={26} className="cursor-light" onClick={revertBackpage}/>
          </Tooltip>
          <Tooltip info="Reset to Default Grid" className="pad-r-10 border-r-light stretch">
            <FaUndoAlt size={19} className="cursor-light mar-l-10" onClick={revertGrid} />
          </Tooltip>
          <Tooltip info="Save All Changes" className="pad-l-10">
            <AiOutlineSave size={25} className="cursor-light center-all" onClick={saveGrid} />
          </Tooltip>
        </BottomMenu>
        :
        null
      }

    </div>
  )
}

export default GridTable