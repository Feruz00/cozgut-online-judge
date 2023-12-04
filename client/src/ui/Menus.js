import { createContext, useContext, useState } from "react";
// import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";
import { RxDotsVertical } from "react-icons/rx";


const StyledMenu = ({children})=>(
    <div className="flex items-center justify-end relative ">
      {children}
    </div>
)


const MenusContext = createContext()

const Menus = ({children})=>{
  const [openId, setOpenId] = useState('')
  const [position, setPosition] = useState(null)
//   console.log(position)
  const close = ()=>setOpenId('')
  const open = setOpenId
  return <MenusContext.Provider value={{openId, close, open, position, setPosition}}>
    {children}
  </MenusContext.Provider>
}

function Toggle({id}){
  const {openId, close, open, setPosition} = useContext(MenusContext)
  function handleClick(e){
    // alert("basyldym")
    e.stopPropagation()
    const rect = e.target.closest('button').getBoundingClientRect()
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y+rect.height+8
    })
    openId === '' || openId !== id ? open(id): close()
  }
//   console.log(position)
  return <button className="bg-none border-none p-2 rounded-sm translate-x-3 transition-all duration-200 
    hover:bg-gray-100
  " onClick={handleClick}>
    <RxDotsVertical className='cursor-pointer text-lg text-color-grey-700' />
  </button>

}

function List({id, children}){
  const {openId,  close} = useContext(MenusContext)
  const ref = useOutsideClick(close, false)
  if(openId!==id) return null
  
  return (
  <ul className=' absolute top-full right-1/12 shadow-md z-10 rounded-md' ref={ref} >
    {children}
  </ul>)
    
}
//

function Button({children, onClick, icon}){
  const {close} = useContext(MenusContext)
  function handleClick(){
    onClick?.()
    close()
  }
  return <li>
    <button className="w-full text-left bg-gray-100 border-none py-2 px-4 text-base transition-all duration-200 flex items-center 
    gap-[1.6rem] hover:bg-color-grey-50
    " onClick={handleClick} > {icon}<span> {children}</span></button>
  </li>

}
Menus.Menu = StyledMenu
Menus.Toogle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus