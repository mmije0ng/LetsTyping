// src/components/KeywordList.js
// 타이핑 결과 - 키워드, 설명

import React from 'react';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const TypingKeyword = ({ keyword, description }) => {
  return (
    <VStack alignItems="flex-start" marginBottom="8px">
      <HStack alignItems="center">
        <FontAwesomeIcon icon={faSearch} />
        <Text
          fontWeight="bold"
          css={{
            color: '#000', // 글씨 색상을 검은색으로 설정
            filter: `
              drop-shadow(0 0 2px rgba(255, 199, 221, 0.7)) 
              drop-shadow(0 0 5px rgba(182, 189, 248, 0.7)) 
              drop-shadow(0 0 10px rgba(194, 254, 247, 0.7))
            `,
          }}
        >
          {keyword}
        </Text>
      </HStack>
      <Text>{description}</Text>
    </VStack>
  );
};

export default TypingKeyword;
