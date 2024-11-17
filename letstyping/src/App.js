import React, { useState } from 'react';
import GlobalStyle from './styles/globalstyles';
import RootLayout from './layouts/root-layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import Home from './pages/home';
import TypingResult from './pages/TypingResult'; // 타이핑 결과 컴포넌트

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태 관리

  const data = {
    time: '1분 27초',
    tasks: 283,
    accuracy: 98,
    keywords: [
      { keyword: '의거', description: '정의를 위해 의로운 일을 함' },
      { keyword: '국위안위 노심초사', description: '나라가 편안한지 걱정한다. 國家安危 勞心焦思' },
      { keyword: '위국헌신 구인본분', description: '나라를 지키기 위해 헌신하는 것은 군인의 임무다.' },
    ],
    highlightKeys: {
      a: 1,
      s: 3,
      d: 5,
      ㄱ: 5,
      ㅐ: 4,
    },
  };

  const closeModal = () => setIsModalOpen(false);

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
          element: <Home />, // 타이핑 컴포넌트 삽입
        },
        {
          path: 'result',
          element: (
            <>
              <Home /> {/* Home 컴포넌트와 함께 TypingResult 표시 */}
              <TypingResult isOpen={isModalOpen} onClose={closeModal} data={data} />
            </>
          ),
        },
        {
          path: 'ranking',
          element: <Home />, // 랭킹 컴포넌트 삽입
        },
      ],
    },
  ]);

  return (
    <ChakraProvider> {/* Chakra UI 스타일 적용 */} 
      <GlobalStyle />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
