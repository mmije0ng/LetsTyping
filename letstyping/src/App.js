import logo from './logo.svg';
import GlobalStyle from './styles/globalstyles';
import RootLayout from './layouts/root-layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/home';

const router = new createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path: 'upload',
        element:<Home/> //업로드 컴포넌트 삽입
      }
      ,
      {
        path: 'typing',
        element:<Home/> //타이핑 컴포넌트 삽입
      },
      {
        path: 'result',
        element:<Home/> //결과 컴포넌트 삽입
      },
      {
        path: 'ranking',
        element:<Home/> //랭킹컴포넌트 삽입
      }
    ]
  }
])

function App() {
  return (
    <>
    <GlobalStyle/>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
