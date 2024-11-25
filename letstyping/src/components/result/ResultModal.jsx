// src/components/ResultModal.js
// 타이핑 결과, 랭킹 모달 창

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

const ResultModal = ({ isOpen, onClose, title = "", children }) => {
  console.log(`ResultModal isOpen: ${isOpen}`); // 상태 확인

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.2)" />
      <ModalContent
        position="relative"
        width={['90%', '80%', '70%', '955px']}
        maxWidth="1114px"
        height="659px"  
        background="#FFFFFF"
        boxShadow="0px 10px 30px rgba(0, 0, 0, 0.25)"
        borderRadius="8px"
        marginBottom="10px"
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="16px 24px" position="relative">
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ResultModal;
