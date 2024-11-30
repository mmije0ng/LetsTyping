// src/components/TimeTaskAccuracyList.js
// 타이핑 결과 - ResultDetail의 각 항목(시간, 타수, 정확도)을 리스트로 출력

import React from 'react';
import { Box } from '@chakra-ui/react';
import ResultDetail from './ResultDetail';
import { faClock, faKeyboard, faCrosshairs } from '@fortawesome/free-solid-svg-icons';

const ResultDetailList = ({ time, cpm, errorCount }) => {
  // 시간 단위 결정 함수
  const formatTime = (time) => {
    if (time >= 3600) {
      return `${(time / 3600).toFixed(2)}시간`; // 시간 단위
    } else if (time >= 60) {
      return `${(time / 60).toFixed(2)}분`; // 분 단위
    } else {
      return `${time}초`; // 초 단위
    }
  };

  const items = [
    { icon: faClock, label: '시간', value: formatTime(time) },
    { icon: faKeyboard, label: '타수', value: cpm+' 타수' },
    { icon: faCrosshairs, label: '오타 횟수', value: errorCount + '번' },
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
