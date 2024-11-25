import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import ResultModal from './ResultModal';
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

  const toggleKoreanLayout = () => {
    setIsKorean((prev) => !prev);
  };

  console.log('타이핑 결과 데이터:', receivedData);
  console.log(`점수: ${score}`);

  return (
    <ResultModal isOpen={true} onClose={() => navigate('/')}>
      <ModalContentContainer>
        {/* 좌측: 타수, 시간, 정확도 정보와 버튼 */}
        <Box display="flex" flexDirection="column" alignItems="flex-start" zIndex="2">
          <ResultDetailList time={time} cpm={cpm} errorCount={errorCount} />
          <Box display="flex" gap="10px" mt="4">
            <Button
              colorScheme="blue"
              onClick={() => alert('Link')}
              w="77px"
              h="31.8px"
            >
              Link
            </Button>
            <Button
              colorScheme="gray"
              onClick={() => navigate('/typing')}
              w="77px"
              h="31.8px"
            >
              Retry
            </Button>
          </Box>
        </Box>

        {/* 중앙: 고양이 이미지 */}
        <Box position="relative" zIndex="1" ml="-208px" mt="20px">
          <TypingResultCat />
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
      <Box mt="20px" width="100%">
        <TypingResultKeyboard
          mistakeKeys={errorCounts}
          isKorean={isKorean}
          toggleKoreanLayout={toggleKoreanLayout}
        />
      </Box>

      {/* Rank 버튼 */}
      <Box display="flex" justifyContent="flex-end" mt="10px">
        <RankButton onClick={goToRankPage} />
      </Box>
    </ResultModal>
  );
};

export default TypingResult;
