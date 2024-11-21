// src/components/RankButton.js
// 타이핑 결과 -> 랭킹 화면으로 넘어가는 버튼 컴포넌트

import React from 'react';
import { StyledRankButton } from '../../styles/result/rankButtonStyles'; // 스타일 import

const RankButton = ({ onClick }) => (
    <StyledRankButton onClick={onClick}>Rank ➔</StyledRankButton>
);

export default RankButton;
