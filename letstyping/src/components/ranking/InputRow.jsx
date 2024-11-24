import React from "react";
import { Box, Input, HStack } from "@chakra-ui/react";

// 빈 칸 배열 컴포넌트 (정답의 자음모음 개수만큼 입력 칸 생성)
const InputRow = ({ jamoAnswer, inputValues, setInputValues, feedback, inputRefs, onInputChange, onKeyDown, onKeyPress }) => {
    return (
      <HStack>
        {jamoAnswer.map((_, index) => (
          <Box
            key={index}
            borderWidth="2px"
            borderColor={feedback[index] || "gray.300"}
            p={2}
            textAlign="center"
            width="50px"
            height="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={feedback[index] ? feedback[index] : "white"}
          >
            <Input
              id={`input-${index}`}
              ref={(el) => (inputRefs.current[index] = el)} // 각 입력 칸을 refs 배열에 저장
              value={inputValues[index]}
              onChange={(e) => onInputChange(e, index)}
              onKeyDown={(e) => onKeyDown(e, index)}
              onKeyPress={onKeyPress}
              maxLength={1}
              textAlign="center"
              variant="unstyled"
            />
          </Box>
        ))}
      </HStack>
    );
  };

  export default InputRow;