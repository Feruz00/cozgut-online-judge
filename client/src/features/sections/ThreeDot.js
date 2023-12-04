import React from 'react'
import Modal from '../../ui/Modal'
import Menus from '../../ui/Menus'
import { RxPencil1, RxTrash } from 'react-icons/rx'
import AddSection from './AddSection'
import ConfirmDelete from '../../ui/ConfirmDelete'

const ThreeDot = ({row, onConfirm, disabled}) => {
  return (
        <Modal>
            <Menus.Menu>
                <Menus.Toogle id={row._id} />
                <Menus.List id={row._id}>
                    <Modal.Open opens="edit">
                        <Menus.Button icon={<RxPencil1/>} >Sazlama</Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="delete">
                        <Menus.Button icon={<RxTrash/>}>Poz</Menus.Button>
                    </Modal.Open>
                </Menus.List>
                <Modal.Window name="edit">
                    <AddSection sectionToEdit={row} />
                </Modal.Window>
                <Modal.Window name="delete">
                    <ConfirmDelete 
                    resourceName={`${row.title} bölümi ýok etmek?`} 
                    disabled={disabled}
                    id={row._id}
                    onConfirm={onConfirm}
                    />
                </Modal.Window>
            </Menus.Menu>
        </Modal> 
  )
}

export default ThreeDot