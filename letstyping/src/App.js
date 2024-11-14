// src/App.js
import React, { useState } from 'react';
import TypingResult from './components/result/TypingResult';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

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

  return (
    <ChakraProvider>
      <Routes>
        { /*일단 타이핑 페이지에 타이핑 결과 모달이 랜더링 되도록*/}
        <Route
          path="/typing"
          element={<TypingResult isOpen={isModalOpen} onClose={closeModal} data={data} />}
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
