import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Button, Flex } from "@chakra-ui/react";
import QuizComp from "./QuizComp";  // QuizComp를 import

const Quiz = ({ keywords }) => {
  // 문제와 정답
  const questions = keywords.map(item => ({
    question: item.description,
    answer: item.keyword
  }));

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

  // 퀴즈 다시 풀기
  const handleRestartQuiz = () => {
    setCurrentIndex(0); // 첫 번째 문제로 돌아가기
    setQuizComplete(false); // 퀴즈 완료 상태 초기화
    setResetState(false); // 상태 초기화
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
          <Button colorScheme="teal" onClick={handleRestartQuiz} mt={4}>
            다시 풀기
          </Button>
          <Button colorScheme="teal" onClick={handleGoHome} mt={4}>
            홈으로 가기
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default Quiz;