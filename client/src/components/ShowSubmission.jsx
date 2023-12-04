import React from 'react'
import Modal from '../ui/Modal'
import SubmissionBody from './SubmissionBody'

const ShowSubmission = ({submission}) => {
    console.log(submission)
  return (
    <Modal>
        <Modal.Open opens="modal">
            <p className='cursor-pointer text-indigo-600'>#</p>                
        </Modal.Open>
        <Modal.Window name="modal">
            <SubmissionBody submission={submission} />
        </Modal.Window>
    </Modal>
  )
}

export default ShowSubmission