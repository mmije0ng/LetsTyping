import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Button, Flex } from "@chakra-ui/react";
import QuizComp from "./QuizComp";
import JSConfetti from "js-confetti";

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

  const jsConfettiRef = useRef(null);  // JSConfetti 인스턴스를 참조로 관리

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

  // // 퀴즈 완료 후 축하 애니메이션 실행
  // useEffect(() => {
  //   // JSConfetti 인스턴스를 한 번만 생성하여 ref에 저장
  //   jsConfettiRef.current = new JSConfetti();
  // }, []); // 한 번만 실행되도록 빈 배열을 의존성으로 설정

  // // 퀴즈 완료 후 축하 애니메이션 실행
  // useEffect(() => {
  //   if (quizComplete && jsConfettiRef.current) {
  //     console.log('컨페티');
  //     jsConfettiRef.current.addConfetti({
  //       emojis: ["👍", "🩵", "🤍", "🩷"],
  //       emojiSize: 50,
  //       confettiNumber: 20,
  //     });
  //   }
  // }, [quizComplete]); // quizComplete 상태를 의존성으로 설정

  return (
    <div>
      {keywords.length === 0 ? (
        // 키워드가 없을 때 표시할 내용
        <Flex direction="column" align="center" justify="center">
          <Text fontSize="lg" textAlign="center">
            타이핑 후 게임을 할 수 있습니다.
          </Text>
          <Button bg="#BEB7FA" color="white" onClick={handleGoHome} mt={4}>
            홈으로 가기
          </Button>
        </Flex>
      ) : (
        // 키워드가 있을 때 퀴즈 진행
        !quizComplete ? (
          <QuizComp
            question={questions[currentIndex].question}
            answer={questions[currentIndex].answer}
            onNextQuestion={handleNextQuestion}
            resetState={resetState}
            onResetState={handleResetState} // 상태 리셋 함수 전달
          />
        ) : (
          <Flex direction="column" align="center" justify="center">
            <Text fontSize="lg" textAlign="center">
              축하합니다! 모든 문제를 풀었어요.
            </Text>
            <Button bg="#9CB9FF" color="white" onClick={handleRestartQuiz} mt={4}>
              다시 풀기
            </Button>
            <Button bg="#9CB9FF" color="white" onClick={handleGoHome} mt={4}>
              홈으로 가기
            </Button>
          </Flex>
        )
      )}
    </div>
  );
};

export default Quiz;