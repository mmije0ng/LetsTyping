import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import ResultModal from '../components/result/ResultModal';
import ResultDetailList from '../components/result/ResultDetailList';
import TypingResultCat from '../components/result/TypingResultCat';
import TypingKeywordList from '../components/result/TypingKeywordList';
import TypingResultKeyboard from '../components/result/TypingResultKeyboard';
import RankButton from '../components/result/RankButton';
import { ModalContentContainer } from '../styles/result/typingResultStyles';

const TypingResult = () => {
  const { state: data } = useLocation(); // 전달된 데이터 받기
  const navigate = useNavigate();
  const [isKorean, setIsKorean] = useState(true); // 한글 영어 상태 관리

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
          <ResultDetailList time={data.time} tasks={data.cpmValue} accuracy={data.wpmValue} />
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
          <TypingKeywordList keywords={data.keywords} />
        </Box>
      </ModalContentContainer>

      {/* 하단: 가상 키보드 */}
      <Box mt="60px" width="100%">
        <TypingResultKeyboard mistakeKeys={data.errorCounts} isKorean={isKorean} toggleKoreanLayout={toggleKoreanLayout} />
      </Box>

      {/* Rank 버튼 */}
      <Box display="flex" justifyContent="flex-end" mt="20px">
        <RankButton onClick={goToRankPage} />
      </Box>
    </ResultModal>
  );
};

export default TypingResult;
