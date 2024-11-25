// 타이핑 결과 모달

import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import CustomModal from '../ranking/CustomModal';
import ResultDetailList from './ResultDetailList';
import TypingResultCat from './TypingResultCat';
import TypingKeywordList from './TypingKeywordList';
import TypingResultKeyboard from './TypingResultKeyboard';
import RankButton from './RankButton';
import { ModalContentContainer } from '../../styles/result/typingResultStyles';

const TypingResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 데이터 수신 (기본값 추가)
  const receivedData = location?.state || {
    content: {
      id: null, // 고양이 아이디
      title: '', // 제목
      keywords: [], // 키워드 맵 (keyword, description)
      content: '', // 내용
    },
    cpm: 0, // 타수
    time: 0, // 시간
    errorCount: 0, // 오타수
    errorCounts: {}, // 틀린 키, 횟수 맵
    name: '', // 유저 이름
    isKorean: true, // 한글, 영어 여부
  };

  const { content, cpm, time, errorCount, errorCounts, name } = receivedData;
  const [isKorean, setIsKorean] = useState(true);
  // const [isKorean, setIsKorean] = useState(receivedData.isKorean);

  
  // 점수 계산
  const score = useMemo(() => cpm - (errorCount * 10), [cpm, errorCount]);

  // 랭킹 페이지로 이동
  const goToRankPage = () => {
    
    navigate('/ranking', {
      state: {
        title: content.title,
        name,
        score,
        keywords: content.keywords,
      },
    });
    
  };

  // 타이핑 결과 키보드 한->영 전환 함수
  const toggleKoreanLayout = () => {
    setIsKorean((prev) => !prev);
  };

  const [isModalOpen, setIsModalOpen] = useState(true); // 모다 상태

  console.log('타이핑 결과 페이지 받아온 데이터:', receivedData);
  console.log(`점수: ${score}`);

  return (
    <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title=""> 
      <ModalContentContainer>
        {/* 좌측: 타수, 시간, 정확도 정보와 버튼 */}
        <Box display="flex" flexDirection="column" alignItems="flex-start" zIndex="2">
          <ResultDetailList time={time} cpm={cpm} errorCount={errorCount} />
          <Box display="flex" gap="10px" mt="4">
            
            {/* link 버튼 */}
            <Button
              colorScheme="blue"
              onClick={() => alert('Link')}
              w="60px"
              h="27.8px"
            >
              Link
            </Button>
            
            {/* typing으로 이동하는 retry 버튼 */}
            <Button
              colorScheme="gray"
              onClick={() => navigate('/typing', { state: { content } })}
              w="65px"
              h="27.8px"
            >
              Retry
            </Button>

          </Box>
        </Box>

        {/* 중앙: 고양이 이미지 */}
        <Box position="relative" zIndex="1" ml="-179px" mt="30px">
          <TypingResultCat id={content.id} />
        </Box>

        {/* 우측: 키워드 목록 표시 */}
        <Box flex="1" ml="20px" width="50%">
          {content.keywords?.length > 0 ? (
            <TypingKeywordList keywords={content.keywords} />
          ) : (
            <p>No keywords available</p> // 키워드가 없을 경우 표시
          )}
        </Box>
      </ModalContentContainer>

      {/* 하단: 가상 키보드 */}
      <Box mt="25px" width="100%">
        <TypingResultKeyboard
          mistakeKeys={errorCounts}
          isKorean={isKorean}
          toggleKoreanLayout={toggleKoreanLayout}
        />
      </Box>

      {/* Rank 버튼 */}
      <Box display="flex" justifyContent="flex-end" mt="20px">
        <RankButton onClick={goToRankPage} />
      </Box>
    </CustomModal>
  );
};

export default TypingResult;
