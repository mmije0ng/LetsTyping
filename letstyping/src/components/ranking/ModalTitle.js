import React from "react";
import { ModalHeader, Button, Flex, Text } from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";

//자식 요소를 가로로 배치하며, 요소 간의 간격을 최대한 벌림
//자식 요소들을 세로 방향으로 가운데 정렬
//margin-bottom 값을 4(Chakra UI의 spacing 단위)로 설정하여 아래쪽에 간격을 만듦

const ModalTitle = ({ title, link }) => {

  return (
    <Flex justifyContent="center" alignItems="center" mt={8} mb={120}>
      <Text fontSize="2xl" fontWeight="bold" mr={6}>{title}</Text>
      <Button
          as="a"
          href={link}
          target="_blank"
          size="sm"
          width="70px"
          height="30px"
          variant="outline"
          borderColor="black"
          color="black"
          _focus={{ boxShadow: "none", borderColor: "black" }}
      >
        <FaLink style={{ marginRight: "8px" }} /> Link
      </Button>
    </Flex>
  );
};


export default ModalTitle;
