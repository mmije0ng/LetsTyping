import React, { useState, useRef, useEffect } from "react";
import { Button, VStack, Text, Alert, AlertIcon, InfoIcon } from "@chakra-ui/react";
import Hangul from "hangul-js";
import { ReactTyped } from "react-typed";
import InputRow from "./InputRow";

// 한글 자모 분리 함수
const splitToJamo = (text) => {
    const jamo = Hangul.d(text); 
    return jamo;
  };

const QuizComp = ({ question, answer, onNextQuestion, resetState, onResetState }) => {
    const jamoAnswer = splitToJamo(answer); // 정답을 자모로 분해
    const [inputValues, setInputValues] = useState(Array(jamoAnswer.length).fill("")); // 입력 값 저장
    const [feedback, setFeedback] = useState([]); // 피드백 (색상 상태)
    const [currentAttempt, setCurrentAttempt] = useState(0); // 시도 횟수
    const [showAnswer, setShowAnswer] = useState(false); // 정답 표시 여부
    const [attempts, setAttempts] = useState([]); // 틀린 시도 배열
    const [isCorrect, setIsCorrect] = useState(false); // 정답 여부를 체크
    const [inputError, setInputError] = useState(""); // 입력 오류 메시지 상태
  
    const inputRefs = useRef([]); // 입력 칸의 참조를 저장
  
    // 자모 유효성 검사
    const isJamoChar = (char) => /^[ㄱ-ㅎㅏ-ㅣ가-힣]$/.test(char);

    // 문제를 바꿀 때마다 상태 초기화
    useEffect(() => {
        if (resetState) {
            setInputValues(Array(jamoAnswer.length).fill(""));
            setFeedback([]);
            setCurrentAttempt(0);
            setShowAnswer(false);
            setAttempts([]);
            setIsCorrect(false);
            setInputError("");
            onResetState(); // 상태 초기화 후 부모로 리셋 요청
        }
    }, [resetState, onResetState]);
  
    // inputValues가 변경될 때마다 출력
    // useEffect(() => {
    //   console.log("Updated inputValues:", inputValues);
    // }, [inputValues]);
  
    const handleInputChange = (e, index) => {
      const value = e.target.value;

      // 한글이 아닌 경우 경고 메시지
      if (!isJamoChar(value)) {
        setInputError("한글만 입력해주세요.");
        return;
      } else {
          setInputError(""); // 한글 입력하면 오류 메시지 지움
      }
  
      if (!e.nativeEvent.isComposing) {
        return;
      }
  
      if (value.length > 1 || !isJamoChar(value)) {
        return;
      }
  
      setInputValues((prevValues) => {
        const newInputValues = [...prevValues];
        newInputValues[index] = value;
        return newInputValues;
      });
  
      if (value && index < jamoAnswer.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        setInputValues((prevValues) => {
          const newInputValues = [...prevValues];
          if (prevValues[index] === "") {
            if (index > 0) {
              newInputValues[index - 1] = "";
              inputRefs.current[index - 1].focus();
            }
          } else {
            newInputValues[index] = "";
          }
          return newInputValues;
        });
      }
      setInputError("");
    };
  
    const checkAnswer = () => {
      const newFeedback = inputValues.map((char, index) =>
        char === jamoAnswer[index] ? "#9ed5ff" : "#ff9e9e"
      );
      setFeedback(newFeedback);
  
      if (inputValues.join("") === jamoAnswer.join("")) {
        console.log('정답맞춤');
        setIsCorrect(true);
        setShowAnswer(true);
      } else {
        if (currentAttempt >= 2) {
          setShowAnswer(true);
        }
        setAttempts((prevAttempts) => [...prevAttempts, inputValues]); // 틀린 시도 배열에 추가
        setCurrentAttempt(currentAttempt + 1);
        setInputValues(Array(jamoAnswer.length).fill("")); // 새 시도를 위해 입력 값 초기화
      }
    };
  
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && inputValues.every((value) => value !== "")) {
        checkAnswer(); // 정답 체크 
        
        // 엔터 키를 눌렀을 때, 포커스 이동
        const nextRow = Math.floor(inputValues.length / jamoAnswer.length); // 몇 번째 줄인지
        console.log('몇번째줄 : ', nextRow);
        const nextIndex = nextRow * jamoAnswer.length - jamoAnswer.length; // 다음 줄의 첫 번째 인덱스
        console.log('다음줄의첫번째인덱스 : ', nextIndex);
  
        if (nextIndex < inputRefs.current.length) {
          inputRefs.current[nextIndex].focus();
        }
      }
    };
  
    return (
      <VStack spacing={4}>

        {/* 입력 오류 경고 */}
        {inputError ? (
          <Alert status="error" maxWidth="600px" width="100%" margin="auto">
              <AlertIcon />
                {inputError}
          </Alert>
        ) : inputValues.every((value) => value === "") ? ( // 빈칸일 때만 info 알림 표시
          <Alert status="info" maxWidth="600px" width="100%" margin="auto">
            <AlertIcon />
            감자 → ㄱ ㅏ ㅁ ㅈ ㅏ
          </Alert>
        ) : null}

        {/* 문제란 */}
        <Text fontSize="lg" textAlign="center">
          Q.  
          <ReactTyped
            strings={[question]} // 입력할 문제를 타이핑할 문자열
            typeSpeed={85} // 타이핑 속도 (ms)
            startDelay={500} // 시작 전 대기 시간 (ms)
            showCursor={true} // 커서 표시
          />
        </Text>
  
        {/* 틀린 시도들 */}
        {attempts.map((attempt, index) => (
          <InputRow
            key={index}
            jamoAnswer={jamoAnswer}
            inputValues={attempt}
            setInputValues={setInputValues}
            feedback={attempt.map((char, i) => (char === jamoAnswer[i] ? "#9ed5ff" : "#ff9e9e"))}
            inputRefs={inputRefs}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
          />
        ))}
  
        {/* 새로운 시도 (3번 이내일 때만 생성) */}
        {currentAttempt < 3 && (
          <InputRow
            jamoAnswer={jamoAnswer}
            inputValues={inputValues}
            setInputValues={setInputValues}
            feedback={isCorrect ? Array(jamoAnswer.length).fill("#9ed5ff") : []} // isCorrect가 true면 초록색, 아니면 피드백 비워둠
            inputRefs={inputRefs}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
          />
        )}
  
        {/* 정답 제출 버튼 */}
        {currentAttempt < 3 && !showAnswer && (
          <Button bg="#9CB9FF" color="white" onClick={checkAnswer}>
            제출
          </Button>
        )}
  
        {/* 정답 결과 */}
        {isCorrect && (
          <Text color="blue.500" fontSize="lg">
            정답입니다 !
          </Text>
        )}
  
        {showAnswer && !isCorrect && (
          <Text color="red.500" fontSize="lg">
            정답: {answer}
          </Text>
        )}

        {(isCorrect || currentAttempt >= 3) && (
            <Button bg="#9CB9FF" color="white" onClick={onNextQuestion}>
              다음 문제
            </Button>
      )}
      </VStack>
    );
  };
  
  export default QuizComp;