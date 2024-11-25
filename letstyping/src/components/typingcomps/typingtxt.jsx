// 컴포넌트 분리
// 타이핑 진행률이 100%가 되면 종료 가 아니라 100뒤에 아무 키라도 입력하면 종료되게 만들기
// 어떤 타자가 얼마나 틀렸는지 - 자음 모음 단위로 타이핑을 했을 때 잘못되었는지 봐야함
//  - 필요한 글자와 타이핑한 글자 비교해서 틀리면 필요한 글자 count++;
//  -- 한계 봉착..
// 타이핑 효과음 넣기
import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Hangul from "hangul-js";
import TypingProgress from "./typingprogress";
const TypingTxt = () => {
  //const originalText = "대한민국 역사박물관은 안의사의 하얼빈 의거 115주년을 기념해 '안중근 서'라는 제목의 특별전을 내년 3월 31일까지 개최해요.​";
  //const originalText = "가는말이 고와야 오는말이 곱다.\n";
  const originalText = "대한민국역사박물관은 안의사의\n하얼빈 의거 115주년을 기념해 '안중근 서'라는 제목의\n특별전을 내년 3월 31일까지 개최해요.\n"
  const [userInput, setUserInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [errors, setErrors] = useState(0);
  const [errorCounts, setErrorCounts] = useState({});
  const inputRef = useRef(null);
  // 오타 기록 함수
  const recordError = (wrongChar) => {
    setErrorCounts((prevCounts) => ({
      ...prevCounts,
      [wrongChar]: (prevCounts[wrongChar] || 0) + 1, // 기존 값에 +1
    }));
  };
  // 키보드 입력 이벤트 처리
  const handleKeyDown = (e) => {
    if (inputRef.current) {
      inputRef.current.focus(); // 키보드 입력 시 항상 input에 포커스
    }
  };
  // 초기 포커스 설정
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  // 입력 이벤트 핸들러
  const handleInputChange = (e) => {
    const value = e.target.value;
    const nextChar = originalText[userInput.length]; // 다음에 입력될 글자
    // '\n'을 강제로 입력하려고 할 때, Enter로만 넘어가게 처리
    if (nextChar === "\n" && value.length > userInput.length) {
      // 입력 제한 (다음 글자가 \n일 경우)
      if (e.nativeEvent.inputType !== "insertLineBreak") {
        return; // Enter 입력만 허용
      }
    }
  
    if (!startTime) {
      setStartTime(Date.now()); // 타이핑 시작 시간 설정
    }
    setUserInput(value);
  
    // 진행도 업데이트
    const progressValue = Math.min((value.length / originalText.length) * 100, 100);
    setProgress(progressValue);
  
    // 자소 단위 오타 계산 및 기록
    value.split("").forEach((char, index) => {
      const targetChar = originalText[index] || ""; // 정답 글자
      const userChar = char || ""; // 사용자가 입력한 글자
  
      // 한글 조합 해체
      const targetDisassembled = Hangul.disassemble(targetChar); // 정답 분해
      const userDisassembled = Hangul.disassemble(userChar); // 사용자 입력 분해
  
      // 자소별 비교
      targetDisassembled.forEach((part, i) => {
        if (part !== userDisassembled[i]) {
          recordError(part); // 틀린 초/중/종성을 기록
        }
      });
    });
  
    // 음절 단위 오타 계산
    const errorCount = calculateErrors(value);
    setErrors(errorCount);
  
    // WPM 업데이트
    updateSpeed(value);
  
    // 진행도 100% 달성 시
    if (progressValue === 100) {
      const timeElapsed = (Date.now() - startTime) / 1000; // 경과 시간 (초)
      const wpmValue = wpm || calculateWPM(value, timeElapsed);
      const cpmVlaue = cpm || calculateCPM(value, timeElapsed);
  
      // 결과 모달 표시
      alert(
        `타이핑 완료!\nCPM: ${cpmVlaue} \nWPM: ${wpmValue} \n오타 수: ${errorCount}\n오타 기록:\n` +
          Object.entries(errorCounts)
            .map(([char, count]) => `${char}: ${count}번`)
            .join("\n")
      );
      resetInput(); // 현재는 반복으로 구현
    }
  };
  // 상태를 주기적으로 업데이트
  useEffect(() => {
    if (!startTime) return; // 타이핑 시작되지 않은 경우 종료
    const intervalId = setInterval(() => {
        const elapsedMinutes = (Date.now() - startTime) / 1000 / 60; // 경과 시간(분)
        const totalCharacters = Hangul.disassemble(userInput).length; // 총 문자 수
        
        // WPM 업데이트
        const wordsTyped = totalCharacters / 5; // 한글 5타 기준
        setWpm(Math.round(wordsTyped / elapsedMinutes));
    
        // CPM 업데이트
        const cpm = Math.round(totalCharacters / elapsedMinutes); // 분당 문자 수
        setCpm(cpm); // 상태 업데이트
        // 진행도 재계산
        const progressValue = Math.min((userInput.length / originalText.length) * 100, 100);
        setProgress(progressValue);
        // 오타 재계산
        setErrors(calculateErrors(userInput));
    }, 50); // 0.5초마다 업데이트
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 제거
  }, [startTime, userInput]);
  // 오타 계산
  const calculateErrors = (typedText) => {
    return typedText.split("").reduce((count, char, index) => {
      return char !== originalText[index] ? count + 1 : count;
    }, 0);
  };
  // WPM 계산
  const calculateWPM = (typedText, timeElapsed) => {
    const wordsTyped = Hangul.disassemble(typedText).length / 5; // 한글 5타 기준
    return Math.round(wordsTyped / (timeElapsed / 60));
  };
  // CPM 계산
  const calculateCPM = (typedText, timeElapsed) => {
    const totalCharacters = Hangul.disassemble(typedText).length; // 총 문자 수
    return Math.round(totalCharacters / (timeElapsed / 60)); // 분당 문자 수
  };
  const updateSpeed = (typedText) => {
    if (!startTime) return;
    const elapsedMinutes = (Date.now() - startTime) / 1000 / 60; // 경과 시간(분)
    const totalCharacters = Hangul.disassemble(typedText).length; // 총 문자 수
    const wordsTyped = totalCharacters / 5; // 한글 5타 기준
    setWpm(Math.round(wordsTyped / elapsedMinutes));
    // CPM 계산
    const cpm = Math.round(totalCharacters / elapsedMinutes); // 분당 문자 수
    setCpm(cpm); // 상태 업데이트
  };
  // 입력 초기화
  const resetInput = () => {
    setUserInput("");
    setStartTime(null);
    setWpm(0);
    setCpm(0);
    setProgress(0);
    setErrors(0);
    setErrorCounts({});
    inputRef.current.focus();
  };
  // 틀린 부분 표시 및 커서 추가
  const renderOverlay = () => {
    const splitText = originalText.split("");
    const userInputLength = userInput.length;
    return splitText.map((char, index) => {
      const userChar = userInput[index] || "";
      const isCorrect = userChar === char;
      // 현재 커서 위치
      const isCursor = index + 1 === userInputLength;
      // 현재 타이핑 중인 글자
      const isCurrent = index === userInputLength - 1;
      if (isCurrent && userInputLength <= originalText.length) {
        // 한글 조합 과정을 표시
        const disassembled = Hangul.disassemble(userChar); // 현재 입력된 글자 분해
        const assembled = Hangul.assemble(disassembled); // 조합 중인 글자
        return (
          <Char key={index} typing>
            {assembled}
            {isCursor && <Cursor />}
          </Char>
        );
      }
      // 완료된 글자 또는 아직 입력되지 않은 글자
      return (
        <Char
          key={index}
          correct={isCorrect}
          completed={index < userInputLength}
        >
          {char}
          {isCursor && <Cursor />}
        </Char>
      );
    });
  };
  const preventDefaultBehavior = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <TypingProgress progress={progress} />
      <Status>
        <span>타수: {cpm} CPM</span>
        <span>속도: {wpm} WPM</span>
        <span>진행도: {progress.toFixed(1)}%</span>
        <span>오타 수: {errors}</span>
      </Status>
      <>
      <TextContainer>
        <OriginalText>{originalText}</OriginalText>
        <UserInputOverlay>{renderOverlay()}</UserInputOverlay>
      </TextContainer>
      <InputField
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        placeholder=""
        onMouseDown={preventDefaultBehavior} // 마우스 클릭 시 선택 방지
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "a") {
            e.preventDefault(); // Ctrl + A 방지
          }
        }}
      />
      </>
    </Container>
  );
};
export default TypingTxt;
// 스타일 컴포넌트
const Container = styled.div`
  width: 1000px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
`;
const TextContainer = styled.div`
  position: relative;
  font-size: 18px;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 20px;
`;
const OriginalText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: pre-wrap;
  z-index: 1;
`;
const UserInputOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: pre-wrap;
  z-index: 2;
  /* 기본 입력 필드와 동일한 스타일 */
  font-size: 18px;
  line-height: 1.6;
  font-family: Arial, sans-serif;
  /* 텍스트 선택 방지 */
  user-select: none;
  /* 오버레이 텍스트 배경을 흰색으로 설정 */
  background-color: white;
`;
// 호이스팅이 안되네 ㅋㅋㅋ
const blink = keyframes`
  50% {
    opacity: 0;
  }
`;
const Char = styled.span`
  color: ${({ correct, completed }) =>
    correct ? "black" : completed ? "red" : "gray"}; /* 완료된 글자 색상 */
  position: relative;
  ${({ typing }) =>
    typing &&
    `
    color: black; /* 조합 중인 글자는 검은색 */
    font-weight: normal;
  `}
`;
const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.5em;
  background-color: black; /* 기본 커서 색상 */
  animation: ${blink} 0.6s step-end infinite;
  vertical-align: bottom;
  margin-left: -2px; /* 커서 위치 조정 */
`;
const InputField = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 18px;
  line-height: 1.6;
  border: none;
  outline: none;
  background: transparent; /* 텍스트 박스를 투명하게 */
  color: transparent; /* 사용자가 입력한 텍스트 숨기기 */
  caret-color: transparent; /* 기본 커서 숨기기 */
  resize: none;
  position: relative;
  z-index: 3;
  /* 맞춤법 검사 비활성화 */
  spellcheck: false;
  /* 텍스트 선택 및 드래그 방지 */
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  
`;
const Progress = styled.div`
  height: 100%;
  width: 0;
  background: #4caf50;
`;
const Status = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;