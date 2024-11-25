import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import ModalTitle from "./ModalTitle";

const CustomModal = ({ isOpen, onClose, children, size = "xl", title = "안중근이 독립기원하며", link = "" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} closeOnOverlayClick={false} >
      <ModalOverlay bg="rgba(0, 0, 0, 0)" />
      <ModalContent
        maxWidth="1100px"
        width={["90%", "80%", "70%", "955px"]}
        height="550px"
        background="#FFFFFF"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.15)"
        borderRadius="md"
        marginBottom="10px"
        margin="auto"
        top="10%"
      >
        {/* 제목 있을 시에만 렌더링 */}
        {title && <ModalTitle title={title} link={link} />}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
