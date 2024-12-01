// 타이핑 결과 모달

import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Button, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faRedo } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../ranking/CustomModal';
import ResultDetailList from './ResultDetailList';
import TypingResultCat from './TypingResultCat';
import TypingKeywordList from './TypingKeywordList';
import TypingResultKeyboard from './TypingResultKeyboard';
import RankButton from './RankButton';

// 스타일 정의
const ModalContentContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  height: auto;
  margin-top: 20px;
`;

const TypingResult = () => {
  const [isTooltipOpen] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // 데이터 수신 (기본값 추가)
  const receivedData = location?.state || {
    content: {
      title: '', // 제목
      keywords: [], // 키워드 맵 (keyword, description)
      content: '', // 내용
      link: '',
    },
    cpm: 0, // 타수
    time: 0, // 시간
    errorCount: 0, // 오타수
    errorCounts: {}, // 틀린 키, 횟수 맵
    name: '', // 유저 이름
    isKorean: true, // 한글, 영어 여부
    selectedCat: 1,
    isCopy: true,
  };

  console.log(`결과 페이지 직접 가져올래요 여부: ${receivedData.isCopy}`);
  console.log(`link: ${receivedData.content.link}`);

  const { content, cpm, time, errorCount, errorCounts, name, selectedCat, isCopy } = receivedData;
  const [isKorean, setIsKorean] = useState(true);

  // 점수 계산
  const score = useMemo(() => cpm - errorCount * 10, [cpm, errorCount]);

  // 랭킹 페이지로 이동
  const goToRankPage = () => {
    navigate('/ranking', {
      state: {
        title: content.title,
        name,
        score,
        keywords: content.keywords,
        link: content.link
      },
    });
  };

  // 모달 클로스 시 홈으로 이동
  const onClose = () => {
    navigate('/');
  };

  // 타이핑 결과 키보드 한->영 전환 함수
  const toggleKoreanLayout = () => {
    setIsKorean((prev) => !prev);
  };

  console.log('타이핑 결과 페이지 받아온 데이터:', receivedData);
  console.log(`점수: ${score}`);

  return (
    <CustomModal isOpen={true} onClose={onClose} title="">
      <ModalContentContainer>
        {/* 좌측: 타수, 시간, 정확도 정보와 버튼 */}
        <Box display="flex" flexDirection="column" alignItems="flex-start" zIndex="2">
          <ResultDetailList time={time} cpm={cpm} errorCount={errorCount} />
          <Box display="flex" gap="10px" mt="4" > 
            <Button
              colorScheme="blue"
              leftIcon={<FontAwesomeIcon icon={faLink} />}
              onClick={() => {
                if (!receivedData.isCopy && content.link) { // 외부 링크로 이동
                  window.open(content.link);
                } else {
                  navigate('/'); // 기본 경로로 이동
                }
              }}
              w="69px"
              h="31.8px"
            >
              Link
            </Button>

            <Button
              colorScheme="gray"
              leftIcon={<FontAwesomeIcon icon={faRedo} />}
              onClick={() => navigate('/typing', { state: { content } })}
              w="69px"
              h="31.8px"
            >
              Retry
            </Button>
          </Box>
        </Box>

        {/* 중앙: 고양이 이미지 */}
        <Box position="relative" zIndex="1" ml="-192px" mt="30px">
          <TypingResultCat id={selectedCat} />
        </Box>

        {/* 우측: 키워드 목록 표시 */}
        <Box flex="1" ml="20px" width="50%" display="flex" justifyContent="center" alignItems="center">
          {content.keywords?.length > 0 ? (
            <TypingKeywordList keywords={content.keywords} />
          ) : (
            <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginTop: '60px' }}>
              직접 입력시에는 키워드가 제공되지 않습니다.
            </p>
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

      {/* Rank 버튼과 Tooltip */}
      {!isCopy && (
        <Box display="flex" justifyContent="flex-end" mt="20px" position="relative">
          <Tooltip
            label={`${name ? `${name}님의 ` : ''}랭킹을 확인해 보세요!`}
            isOpen={isTooltipOpen}
            hasArrow
            placement="bottom" // 툴팁을 버튼 하단에 배치
            bg="#696969"
            color="white"
          >
            <Box>
              <RankButton onClick={goToRankPage} />
            </Box>
          </Tooltip>
        </Box>
      )}
    </CustomModal>
  );
};

export default TypingResult;
