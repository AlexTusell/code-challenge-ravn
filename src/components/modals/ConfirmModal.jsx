import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { IDContext } from '../../contexts/IDContext';

const ConfirmModal = ({ isOpen, onClose, confirm }) => {
  const { setIdDelete } = useContext(IDContext);

  const handleClose = () => {
    setIdDelete('');
    onClose();
  };

  const handleConfirm = () => {
    confirm();
    handleClose();
  };
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor="gray.300">
        <ModalBody>
          <Flex justifyContent="center" mt={5}>
            <Text>You want to delete this Task?</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose} variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm" onClick={() => handleConfirm()}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
