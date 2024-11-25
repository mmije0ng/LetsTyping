import React, { useState } from 'react';
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

  // 데이터 수신 (기본값 추가)ss
  const data = location?.state || {
    content: {
      id: null,
      title: '',
      keywords: [],
      content: '',
    },
    cpm: 0,
    time: 0,
    errorCount: 0,
    errorCounts: {},
    isKorean: true,
  };


console.log('Data received:', data);
console.dir(data.content); 
console.dir(data.errorCounts);


  const [isKorean, setIsKorean] = useState(true);

  const goToRankPage = () => {
    navigate('/ranking');
  };

  const toggleKoreanLayout = () => {
    setIsKorean((prev) => !prev);
  };

  return (
    <ResultModal isOpen={true} onClose={() => navigate('/')}>
      <ModalContentContainer>
        {/* 좌측: 타수, 시간, 정확도 정보와 버튼 */}
        <Box display="flex" flexDirection="column" alignItems="flex-start" zIndex="2">
          <ResultDetailList
            time={data.time}
            cpm={data.cpm}
            errorCount={data.errorCount}
          />
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
          {data.content.keywords?.length > 0 ? (
            <TypingKeywordList keywords={data.content.keywords} />
          ) : (
            <p>No keywords available</p> // 키워드가 없을 경우 표시
          )}
        </Box>
      </ModalContentContainer>

      {/* 하단: 가상 키보드 */}
      <Box mt="20px" width="100%">
        <TypingResultKeyboard
          mistakeKeys={data.errorCounts}
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
