// src/components/ResultDetail.js
// 타이핑 결과 - 시간, 타수, 정확도 항목을 나타내는 개별 컴포넌트

import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ResultDetail = ({ icon, label, value }) => (
  <HStack spacing={2} align="center">
    <FontAwesomeIcon icon={icon} style={{ fontSize: '14px' }} />
    <Text fontSize="14px" fontWeight="bold">
      {label}: <Text as="span" fontWeight="normal">{value}</Text>
    </Text>
  </HStack>
);

export default ResultDetail;
