// src/components/RankButton.js
// 타이핑 결과 -> 랭킹 화면으로 넘어가는 버튼 컴포넌트

import React from 'react';
import { Button } from '@chakra-ui/react';
import styled from 'styled-components';

const RankButton = ({ onClick }) => (
    <StyledRankButton onClick={onClick}>Rank ➔</StyledRankButton>
);

const StyledRankButton = styled(Button)`
    background: linear-gradient(90deg, #ffc7dd 0%, #b6bdf8 50%, #c2fef7 100%) !important;
    color: white;
    font-weight: bold;
    border-radius: 50px !important;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default RankButton;
