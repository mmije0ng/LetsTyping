// src/components/TypingResultCat.js
// 타이핑 결과 - 고양이 이미지 컴포넌트

import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import TypingResultCatImage from '../../assets/images/TypingResultCat.svg';

const TypingResultCat = () => (
    <Box display="flex" justifyContent="flex-start" alignItems="center" width="100%">
        <Image src={TypingResultCatImage} alt="Typing Result Cat" width="410px" maxWidth="100%" />
    </Box>
);

export default TypingResultCat;