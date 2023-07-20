import React from 'react'
// import { Dialog } from '@headlessui/react'
import Modal from './Modal'
import Example from './Example'

interface ConfirmModalProps {
  isOpen?: boolean
  onClose: () => void
  theme?: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  theme,
}) => {
  return (
    <Modal theme={theme} isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <Example />
        {/* <div
          className="
            mt-3 
            text-center 
            sm:ml-4 
            sm:mt-0 
            sm:text-left
          "
        >
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>
          </div>
        </div> */}
      </div>
    </Modal>
  )
}

export default ConfirmModal
