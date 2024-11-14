// src/components/TypingResult.js
// 타이핑 결과 

import React, { useState } from 'react';
import ResultModal from './ResultModal';
import { Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ResultDetailList from './ResultDetailList';
import TypingResultCat from './TypingResultCat';
import TypingKeywordList from './TypingKeywordList';
import TypingResultKeyboard from './TypingResultKeyboard';
import RankButton from './RankButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faRedo } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const ModalContentContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    height: auto;
    margin-top: 20px;
`;

const TypingResult = ({ isOpen, onClose, data }) => {
    const navigate = useNavigate();
    const [isKorean, setIsKorean] = useState(true); // 한글/영어 상태 관리

    const goToRankPage = () => {
        navigate('/rank');
    };

    // 한글/영어 키보드 전환 함수
    const toggleKoreanLayout = () => {
        setIsKorean((prev) => !prev);
    };

    return (
        <ResultModal isOpen={isOpen} onClose={onClose}>
        <ModalContentContainer>
            {/* 좌측: 타수, 시간, 정확도 정보와 버튼 */}
            <Box display="flex" flexDirection="column" alignItems="flex-start" zIndex="2">
            <ResultDetailList time={data.time} tasks={data.tasks} accuracy={data.accuracy} />
            <Box display="flex" gap="10px" mt="4">
                <Button
                colorScheme="blue"
                leftIcon={<FontAwesomeIcon icon={faLink} />}
                onClick={() => alert('Link')}
                w="77px"
                h="31.8px"
                >
                Link
                </Button>
                <Button
                colorScheme="gray"
                leftIcon={<FontAwesomeIcon icon={faRedo} />}
                onClick={() => alert('Retry')}
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
        <Box mt="20" width="100%">
            <TypingResultKeyboard highlightKeys={data.highlightKeys} isKorean={isKorean} toggleKoreanLayout={toggleKoreanLayout} />
        </Box>

        {/* Rank 버튼 */}
        <Box display="flex" justifyContent="flex-end" mt="10">
            <RankButton onClick={goToRankPage} />
        </Box>
        </ResultModal>
    );
};

export default TypingResult;
