import React from 'react'
import { Button } from 'antd'
import { useSearchParams } from 'react-router-dom'
import Filter from '../../ui/Filter'
import Modal from '../../ui/Modal'
import TagPage from '../../features/problems/TagPage'
import ProblemPage from '../../features/problems/ProblemPage'
import AddTag from '../../features/problems/AddTag'

const AdminProblem = () => {

    const [searchParams] = useSearchParams()
    const isTagPage = searchParams.get('main') === 'tags';

    
  return (
    <div className='mt-1'>
        <div className='flex justify-between px-5 shadow items-center'>
            <h1 className="text-lg font-medium  uppercase"> Mysallar bölümi </h1>
            <div className='flex flex-row items-center gap-4'>

                <Filter
                    filterField="main" 
                    options={[
                        { value: 'problems', label: 'Meseleler' },
                        { value: 'tags', label: 'Tegler' }
                    ]}
                />
                <Modal>
                    <Modal.Open opens="tags">
                        <Button disabled={!isTagPage}> + Teg döret </Button>
                    </Modal.Open>
                    <Modal.Window name="tags">
                        <AddTag />
                    </Modal.Window>
                </Modal>
            </div>
            
        </div>
        {
            isTagPage ? <TagPage /> : <ProblemPage />
        }
        
    </div>
  )
}

export default AdminProblem