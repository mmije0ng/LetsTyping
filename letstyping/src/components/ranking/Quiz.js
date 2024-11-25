import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Button, Flex } from "@chakra-ui/react";
import QuizComp from "./QuizComp";  // QuizComp를 import

const Quiz = () => {
  // 문제 배열 (예시)
  const questions = [
    { question: "정의를 위해 의로운 일을 함", answer: "의거" },
    { question: "나라가 편안한지 걱정한다", answer: "국위안위노심초사" },
    { question: "나라를 지키기 위해 헌신하는 것은 군인의 임무다", answer: "위국헌신구인본분" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 문제의 인덱스
  const [quizComplete, setQuizComplete] = useState(false); // 퀴즈 완료 여부
  const [resetState, setResetState] = useState(false); // 상태 초기화 플래그
  const navigate = useNavigate(); 

  // 문제를 풀고 난 후, 다음 문제로 이동
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setResetState(true);
      setCurrentIndex(currentIndex + 1); // 다음 문제로 이동
    } else {
      setQuizComplete(true); // 퀴즈 완료
    }
  };

  // 상태 초기화 후 다시 resetState를 false로 변경
  const handleResetState = () => {
    setResetState(false);
  };

  // 홈으로 이동
   const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      {!quizComplete ? (
        <QuizComp
          question={questions[currentIndex].question}
          answer={questions[currentIndex].answer}
          onNextQuestion={handleNextQuestion}
          resetState={resetState}
          onResetState={handleResetState} // 상태 리셋 함수 전달
        />
      ) : (
        <Flex 
          direction="column" 
          align="center" 
          justify="center" 
        >
          <Text fontSize="lg" textAlign="center">
            축하합니다! 모든 문제를 풀었어요.
          </Text>
          <Button colorScheme="teal" onClick={handleGoHome} mt={4}>
            다시 하기
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default Quiz;





// import React, { useState, useEffect, useRef } from "react";
// import { Box, Input, Button, VStack, HStack, Text } from "@chakra-ui/react";
// import Hangul from "hangul-js";

// // 한글 자모 분리 함수
// const splitToJamo = (text) => {
//   const jamo = Hangul.d(text); 
//   return jamo;
// };

// // 빈 칸 배열 컴포넌트 (정답의 자음모음 개수만큼 입력 칸 생성)
// const InputRow = ({ jamoAnswer, inputValues, setInputValues, feedback, inputRefs, onInputChange, onKeyDown, onKeyPress }) => {
//   return (
//     <HStack>
//       {jamoAnswer.map((_, index) => (
//         <Box
//           key={index}
//           borderWidth="2px"
//           borderColor={feedback[index] || "gray.300"}
//           p={2}
//           textAlign="center"
//           width="50px"
//           height="50px"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           bg={feedback[index] ? feedback[index] : "white"}
//         >
//           <Input
//             id={`input-${index}`}
//             ref={(el) => (inputRefs.current[index] = el)} // 각 입력 칸을 refs 배열에 저장
//             value={inputValues[index]}
//             onChange={(e) => onInputChange(e, index)}
//             onKeyDown={(e) => onKeyDown(e, index)}
//             onKeyPress={onKeyPress}
//             maxLength={1}
//             textAlign="center"
//             variant="unstyled"
//           />
//         </Box>
//       ))}
//     </HStack>
//   );
// };

// const Quiz = ({ question = "정의를 위해 의로운 일을 함", answer = "의거" }) => {
//   const jamoAnswer = splitToJamo(answer); // 정답을 자모로 분해
//   const [inputValues, setInputValues] = useState(Array(jamoAnswer.length).fill("")); // 입력 값 저장
//   const [feedback, setFeedback] = useState([]); // 피드백 (색상 상태)
//   const [currentAttempt, setCurrentAttempt] = useState(0); // 시도 횟수
//   const [showAnswer, setShowAnswer] = useState(false); // 정답 표시 여부
//   const [attempts, setAttempts] = useState([]); // 틀린 시도 배열
//   const [isCorrect, setIsCorrect] = useState(false); // 정답 여부를 체크

//   const inputRefs = useRef([]); // 입력 칸의 참조를 저장

//   // 자모 유효성 검사
//   const isJamoChar = (char) => /^[ㄱ-ㅎㅏ-ㅣ가-힣]$/.test(char);

//   // inputValues가 변경될 때마다 출력
//   // useEffect(() => {
//   //   console.log("Updated inputValues:", inputValues);
//   // }, [inputValues]);

//   const handleInputChange = (e, index) => {
//     const value = e.target.value;

//     if (!e.nativeEvent.isComposing) {
//       return;
//     }

//     if (value.length > 1 || !isJamoChar(value)) {
//       return;
//     }

//     setInputValues((prevValues) => {
//       const newInputValues = [...prevValues];
//       newInputValues[index] = value;
//       return newInputValues;
//     });

//     if (value && index < jamoAnswer.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace") {
//       e.preventDefault();
//       setInputValues((prevValues) => {
//         const newInputValues = [...prevValues];
//         if (prevValues[index] === "") {
//           if (index > 0) {
//             newInputValues[index - 1] = "";
//             inputRefs.current[index - 1].focus();
//           }
//         } else {
//           newInputValues[index] = "";
//         }
//         return newInputValues;
//       });
//     }
//   };

//   const checkAnswer = () => {
//     const newFeedback = inputValues.map((char, index) =>
//       char === jamoAnswer[index] ? "#9ed5ff" : "#ff9e9e"
//     );
//     setFeedback(newFeedback);

//     if (inputValues.join("") === jamoAnswer.join("")) {
//       console.log('정답맞춤');
//       setIsCorrect(true);
//       setShowAnswer(true);
//     } else {
//       if (currentAttempt >= 2) {
//         setShowAnswer(true);
//       }
//       setAttempts((prevAttempts) => [...prevAttempts, inputValues]); // 틀린 시도 배열에 추가
//       setCurrentAttempt(currentAttempt + 1);
//       setInputValues(Array(jamoAnswer.length).fill("")); // 새 시도를 위해 입력 값 초기화
//     }
//   };

//   // const handleKeyPress = (e) => {
//   //   if (e.key === "Enter" && inputValues.every((value) => value !== "")) {
//   //     checkAnswer();
//   //   }
//   // };
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && inputValues.every((value) => value !== "")) {
//       checkAnswer(); // 정답 체크 
      
//       // 엔터 키를 눌렀을 때, 포커스 이동
//       const nextRow = Math.floor(inputValues.length / jamoAnswer.length); // 몇 번째 줄인지
//       console.log('몇번째줄 : ', nextRow);
//       const nextIndex = nextRow * jamoAnswer.length - jamoAnswer.length; // 다음 줄의 첫 번째 인덱스
//       console.log('다음줄의첫번째인덱스 : ', nextIndex);

//       if (nextIndex < inputRefs.current.length) {
//         inputRefs.current[nextIndex].focus();
//       }
//     }
//   };

//   return (
//     <VStack spacing={4}>

//       {/* 문제란 */}
//       <Text fontSize="lg" textAlign="center">
//         Q. {question}
//       </Text>

//       {/* 틀린 시도들 */}
//       {attempts.map((attempt, index) => (
//         <InputRow
//           key={index}
//           jamoAnswer={jamoAnswer}
//           inputValues={attempt}
//           setInputValues={setInputValues}
//           feedback={attempt.map((char, i) => (char === jamoAnswer[i] ? "#9ed5ff" : "#ff9e9e"))}
//           inputRefs={inputRefs}
//           onInputChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           onKeyPress={handleKeyPress}
//         />
//       ))}

//       {/* 새로운 시도 (3번 이내일 때만 생성) */}
//       {currentAttempt < 3 && (
//         <InputRow
//           jamoAnswer={jamoAnswer}
//           inputValues={inputValues}
//           setInputValues={setInputValues}
//           feedback={isCorrect ? Array(jamoAnswer.length).fill("#9ed5ff") : []} // isCorrect가 true면 초록색, 아니면 피드백 비워둠
//           inputRefs={inputRefs}
//           onInputChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           onKeyPress={handleKeyPress}
//         />
//       )}

//       {/* 정답 제출 버튼 */}
//       {currentAttempt < 3 && (
//         <Button colorScheme="teal" onClick={checkAnswer}>
//           제출
//         </Button>
//       )}

//       {/* 정답 결과 */}
//       {isCorrect && (
//         <Text color="blue.500" fontSize="lg">
//           🎉 정답입니다 🎉
//         </Text>
//       )}

//       {showAnswer && !isCorrect && (
//         <Text color="red.500" fontSize="lg">
//           정답: {answer}
//         </Text>
//       )}
//     </VStack>
//   );
// };

// export default Quiz;
