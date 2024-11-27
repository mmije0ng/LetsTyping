// 타이핑 결과 페이지

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TypingResult from '../components/result/TypingResult';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 데이터 수신 (기본값 추가)
  const data = location?.state || {
    content: {
      title: '',
      keywords: [],
      content: '',
    },
    cpm: 0,
    time: 0,
    errorCount: 0,
    errorCounts: {},
    isKorean: true,
    selectedCat: 1,
  };

  console.log('Data received:', data);
  console.dir(data.content);
  console.dir(data.errorCounts);

  const [isKorean, setIsKorean] = useState(true);

  const goToRankPage = () => {
    navigate('/ranking');
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleRetry = () => {
    navigate('/typing');
  };

  return (
    <TypingResult
      data={data}
      isKorean={isKorean}
      setIsKorean={setIsKorean}
      onClose={handleClose}
      onRetry={handleRetry}
      onRankPage={goToRankPage}
    />
  );
};

export default Result;
