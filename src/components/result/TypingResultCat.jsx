// src/components/TypingResultCat.js
// 타이핑 결과 - 고양이 이미지 컴포넌트

import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import YellowCat from '../../assets/images/TypingResultCatYellow.png';
import BlackCat from '../../assets/images/TypingResultCatBlack.png';

const TypingResultCat = ({ id=1 }) => {
    // 고양이 id에 따른 이미지 선택
    const catImage = id === 1 ? YellowCat : id === 2 ? BlackCat : BlackCat;

    return (
    <Box display="flex" justifyContent="flex-start" alignItems="center" width="100%">
        {catImage ? (
            <Image src={catImage} alt="Typing Result Cat" width="410px" maxWidth="100%" />
        ) : (
          <p>No cat image available</p> // id가 1, 2가 아닐 경우 표시
        )}
    </Box>
    );
};

export default TypingResultCat;