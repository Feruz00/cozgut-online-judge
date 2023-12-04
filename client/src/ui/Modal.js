import {createPortal} from 'react-dom';
import { cloneElement, createContext, useState, useContext } from 'react';
import { useOutsideClick } from '../services/useOutsideClick';
import { RxCross2 } from 'react-icons/rx';
const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName, onClick }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () =>  { 
    if(typeof onClick === 'function') onClick()
    open(opensWindowName)
  
  } });
}

const Window = ({children, name})=>{
  const {openName, close} = useContext(ModalContext)
  const ref = useOutsideClick(close)
  if(name !== openName) return null

  return createPortal( 
  
  <div className='fixed top-0 left-0 w-full h-screen bg-[rgba(0, 0, 0, 0.3)] backdrop-blur z-[1000] transition duration-500  '>
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-color-grey-0 rounded-lg shadow-lg px-12 py-16 transition duration-500' ref={ref}>
      <button className='cursor-pointer bg-white border-none p-2 rounded-sm translate-x-3 transition duration-150 absolute top-5 right-8 hover:text-color-grey-300' onClick={close}>
        <RxCross2 className=" text-color-grey-500 text-xl" />
      </button>
      
      <div>
        {cloneElement(children, {onCloseModal: close})}
      </div>
    </div>
  </div>, document.body )
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
