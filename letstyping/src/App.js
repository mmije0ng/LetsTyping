import React, { useState } from 'react';
import logo from './logo.svg';
import GlobalStyle from './styles/globalstyles';
import RootLayout from './layouts/root-layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Ranking from './pages/Ranking';
import Home from './pages/home';
import Typing from './pages/typing';
import TypingResult from './pages/TypingResult'; // TypingResult 컴포넌트
import TypingCalculate from './components/result/TypingCalculate';

const theme = extendTheme();

const App = () => {
  const [resultData, setResultData] = useState(null); // TypingChallenge 결과 데이터
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태 관리

  // 데이터 객체로 생성
  const data = {
    stringData: [
      "안녕하세요",
      "hello",
      "끝까지 입력해 보세요",
    ], // 테스트 문자열 데이터
    keywords: [
      { keyword: "의거", description: "정의를 위해 의로운 일을 함" },
      { keyword: "국위안위 노심초사", description: "나라가 편안한지 걱정한다." },
      { keyword: "위국헌신 구인본분", description: "나라를 지키기 위해 헌신하는 것은 군인의 임무다." },
    ],
    isKorean: true,
  };


  // const stringData = [
  //   "hello",
  //   "test"
  // ]; // 테스트 문자열 데이터


  const closeModal = () => setIsModalOpen(false);

  const handleTypingComplete = async (data) => {
    setResultData(data); // TypingChallenge에서 결과 데이터를 저장
    setIsModalOpen(true); // 모달 열기
  
  };
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'upload',
          element: <Home />, // 업로드 컴포넌트 삽입
        },
        {
          path: 'typing',
          element: <Typing />, // 타이핑 컴포넌트 삽입
        },
        {
          path: 'result',
          element: (
            resultData ? (
              <TypingResult
                isOpen={isModalOpen}
                onClose={closeModal}
                data={resultData}
              />
            ) : (
              // 타이핑 시작 전에는 결과 보기 불가
              // 나중에 스타일 수정하기
              <div>타이핑 시작 전에는 결과 보기 불가</div>
            )
          ),
        }
        ,
        {
          path: 'ranking',
          element:<Ranking/> //랭킹컴포넌트 삽입
        },
        { // 타이핑 알고리즘 테스트
          path: 'typing-test',
          element: (
            <TypingCalculate
              data={data} // data 객체로 전달
              onComplete={handleTypingComplete} // 타이핑 완료 시 호출
              isKorean={true} // 한글 타이핑인지 영어 타이핑인지
            />
          ),
        },
      ],
    },
  ]);
  return (

    <ChakraProvider theme={theme}>
      <GlobalStyle/>
      <RouterProvider router={router}/>
    </ChakraProvider>
  );
};

export default App;
