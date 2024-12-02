// src/components/Keywords.js
// 타이핑 결과 - 키워드, 설명 리스트

import React from 'react';
import styled from 'styled-components';
import { Box } from '@chakra-ui/react';
import TypingKeyword from './TypingKeyword';


// 키워드 리스트 컴포넌트
const TypingKeywordList = ({ keywords }) => (
  <KeywordsWrapper>
    {keywords.map((item, index) => (
      <TypingKeyword key={index} keyword={item.keyword} description={item.description} />
    ))}
  </KeywordsWrapper>
);

// 스타일 정의
const KeywordsWrapper = styled(Box)`
  font-size: 16px;
  line-height: 1.8;
  width: 100%;
  padding-left: 30px;
`;

export default TypingKeywordList;
