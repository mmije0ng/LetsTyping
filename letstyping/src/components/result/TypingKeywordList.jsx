// src/components/Keywords.js
// 타이핑 결과 - 키워드, 설명 리스트

import React from 'react';
import { KeywordsWrapper } from '../../styles/result/typingKeywordListStyles'; // 스타일 import
import TypingKeyword from './TypingKeyword';

// 키워드 리스트를 매개변수로 받음
const TypingKeywordList = ({ keywords }) => (
  <KeywordsWrapper>
    {keywords.map((item, index) => (
      <TypingKeyword key={index} keyword={item.keyword} description={item.description} />
    ))}
  </KeywordsWrapper>
);

export default TypingKeywordList;

