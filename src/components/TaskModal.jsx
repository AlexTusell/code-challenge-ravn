import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

const TaskModal = ({ task, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor="gray.300">
        <ModalCloseButton />
        <ModalBody pb={6}></ModalBody>

        <ModalFooter gap={4}>
          <Button onClick={onClose} variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
