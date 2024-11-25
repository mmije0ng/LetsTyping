import React, { useState } from 'react';
import logo from './logo.svg';
import GlobalStyle from './styles/globalstyles';
import RootLayout from './layouts/root-layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Home from './pages/home'; // 홈
import Typing from './pages/typing.jsx'; // 타이핑 컴포넌트
import TypingResult from './pages/TypingResult'; // 타이핑 결과 컴포넌트
import Ranking from './pages/Ranking'; // 결과 컴포넌트
import TypingCalculate from './components/result/TypingCalculate';

const theme = extendTheme();

const App = () => {
  // const [resultData, setResultData] = useState(null); // TypingChallenge 결과 데이터
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태 관리
  const closeModal = () => setIsModalOpen(false);

  const handleTypingComplete = async (data) => {
    // setResultData(data); // TypingChallenge에서 결과 데이터를 저장
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
          element:<Typing/>, // 타이핑 컴포넌트 삽입
        },
        {
          path: 'result',
          element: (
            <TypingResult
            isOpen={isModalOpen}
            onClose={closeModal}
          />
          ),
        }
        ,
        {
          path: 'ranking',
          element:<Ranking/> //랭킹컴포넌트 삽입
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
