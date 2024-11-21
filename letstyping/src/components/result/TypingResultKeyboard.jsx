// src/components/TypingResultKeyboard.js
// 타이핑 결과 - 타이핑 키보드 화면 (세세한 부분 수정 필요)

import React, { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import styled from "styled-components";

const TypingResultKeyboard = ({ mistakeKeys, isKorean, toggleKoreanLayout }) => {
  const [layoutName, setLayoutName] = useState("default");

  // 각 키의 색상을 결정하는 함수
  const getKeyColorClass = (count) => {
    if (count >= 5) return "hg-red";         // 진한 빨간색
    if (count >= 3) return "hg-medium-red";  // 중간 빨간색
    if (count >= 1) return "hg-light-red";   // 아주 연한 빨간색
    return "";                               // 기본 색상
  };

  // buttonTheme 배열을 생성하여 특정 키에 스타일을 적용
  const buttonTheme = Object.keys(mistakeKeys).flatMap((key) => {
    const colorClass = getKeyColorClass(mistakeKeys[key]);
    if (/^[a-zA-Z]$/.test(key)) { // 영어 알파벳인지 확인
      return [
        { class: colorClass, buttons: key.toLowerCase() },
        { class: colorClass, buttons: key.toUpperCase() },
      ];
    }
    return { class: colorClass, buttons: key };
  });

  // Shift 및 Caps Lock 토글을 위한 함수
  const handleShift = () => {
    setLayoutName((prev) => (prev === "default" ? "shift" : "default"));
  };

  return (
    <StyledKeyboardWrapper>
      <Keyboard
        layoutName={layoutName}
        layout={
          isKorean ? {                      
            // 한글 레이아웃
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ [ ] \\",
              "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ ; ' {enter}",
              "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift}",
              "{space} 한/영"
            ],
            shift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ { } |",
              "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : \" {enter}",
              "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ < > ? {shift}",
              "{space} 한/영"
            ]
          } : {                             
            // 영어 레이아웃
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "q w e r t y u i o p [ ] \\",
              "a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / {shift}",
              "{space} 한/영"
            ],
            shift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "Q W E R T Y U I O P { } |",
              'A S D F G H J K L : " {enter}',
              "{shift} Z X C V B N M < > ? {shift}",
              "{space} 한/영"
            ]
          }
        }
        onKeyPress={(button) => {
          if (button === "{shift}" || button === "{lock}") handleShift();
          if (button === "한/영") toggleKoreanLayout(); // 한/영 키를 누르면 레이아웃 전환
        }}
        buttonTheme={buttonTheme}
      />
    </StyledKeyboardWrapper>
  );
};

export default TypingResultKeyboard;

// 스타일 적용
const StyledKeyboardWrapper = styled.div`
  .hg-light-red {
    background-color: #FFD1D1 !important;
  }
  .hg-medium-red {
    background-color: #E0737D !important;
  }
  .hg-red {
    background-color: #CB3342 !important;
  }
`;
