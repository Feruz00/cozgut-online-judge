import React from 'react'
import Table from '../../ui/Table'
import Modal from '../../ui/Modal'
import Menus from '../../ui/Menus'
import { RxPencil1, RxTrash } from 'react-icons/rx'
import AddSection from './AddSection'
import ConfirmDelete from '../../ui/ConfirmDelete'

const P = ({children})=>{
    return <p className='text-sm text-gray-900 font-semibold border-r border-r-color-grey-300 '>{children}</p>
}

const SectionRow = ({row}) => {
  return (
    <Table.Row>
        <P>{row.title}</P>
        <P>{row.description}</P>
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
                    disabled={false}
                    // disabled={isDeletingSection} 
                    // onConfirm={()=>deleteSection(i._id)} 
                    onConfirm={()=>{}}
                    />
                </Modal.Window>
            </Menus.Menu>
        </Modal> 
    </Table.Row>
  )
}

export default SectionRow