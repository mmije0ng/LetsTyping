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
        <Text fontWeight="bold">{keyword}</Text>
      </HStack>
      <Text>{description}</Text>
    </VStack>
  );
};

export default TypingKeyword;
