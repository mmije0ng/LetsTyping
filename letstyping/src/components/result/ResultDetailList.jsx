// src/components/TimeTaskAccuracyList.js
// 타이핑 결과 - ResultDetail의 각 항목(시간, 타수, 정확도)을 리스트로 출력

import React from 'react';
import { Box } from '@chakra-ui/react';
import ResultDetail from './ResultDetail';
import { faClock, faKeyboard, faEye } from '@fortawesome/free-solid-svg-icons';

const ResultDetailList = ({ time, cpm, errorCount }) => {
  const items = [
    { icon: faClock, label: '시간', value: time },
    { icon: faKeyboard, label: '타수', value: cpm },
    { icon: faEye, label: '오타수', value: errorCount },
  ];

  return (
    <Box fontSize="1.1rem" display="flex" flexDirection="column" alignItems="flex-start" gap="8px" mb="20px">
      {items.map((item, index) => (
        <ResultDetail key={index} icon={item.icon} label={item.label} value={item.value} />
      ))}
    </Box>
  );
};

export default ResultDetailList;
