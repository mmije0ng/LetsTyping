import React, { useState } from 'react';

import logo from './logo.svg';
import GlobalStyle from './styles/globalstyles';
import RootLayout from './layouts/root-layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Home from './pages/home'; // 홈
import Typing from './pages/typing.jsx'; // 타이핑 컴포넌트
import Result from './pages/Result.jsx'; // 결과 컴포넌트
import Ranking from './pages/Ranking'; // 랭킹 컴포넌트

const theme = extendTheme();

const App = () => {
  
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
            <Result/> // 랭킹 컴포넌트 삽입
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
