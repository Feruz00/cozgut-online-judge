import React from 'react'
import Button from '../../ui/Button'
import {RxPlus} from 'react-icons/rx'
import Modal from '../../ui/Modal'
import AddSection from './AddSection'
const SectionHeader = () => {
  return (
    <div className='w-full shadow py-2 px-2 flex flex-row justify-between items-center mb-1'>
      <p className='text-base  font-semibold text-color-grey-700'>Öwrenmek üçin maglumatlar </p>
      <Modal>
        <Modal.Open opens="section">
          <Button className="flex items-center gap-1 rounded-sm" outline >
            <RxPlus />
            Täze goş
          </Button>   
        </Modal.Open>  
        <Modal.Window name="section">
          <AddSection />
        </Modal.Window>
      </Modal> 
      </div>
  )
}

export default SectionHeader