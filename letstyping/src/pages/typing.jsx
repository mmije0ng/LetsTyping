import TypingTxt from "../components/typingcomps/typingtxt";
import { useLocation } from 'react-router-dom';
// 고양이 선택, 글 선택 불러오기

// 가져온 글 맨 마지막에 줄바꿈 없으면 넣기

function Typing() {
  const location = useLocation();
  return (
    <>
      <TypingTxt location={location}/>
    </>
  );
}

export default Typing;
