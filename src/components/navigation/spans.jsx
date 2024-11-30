import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Spans = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavSpan onClick={()=>{navigate("/")}}>Home</NavSpan>
            <NavSpan onClick={()=>{navigate("/typing")}}>typing</NavSpan>
            <NavSpan onClick={()=>{navigate("/result")}}>result</NavSpan>
            <NavSpan onClick={()=>{navigate("/ranking")}}>ranking</NavSpan>
        </>
    )
}

const NavSpan = styled.span`
width: 100%;
height: 21px;

margin-right:20px;

font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 18.5781px;
line-height: 20px;
/* identical to box height, or 108% */
letter-spacing: -0.01em;

color: #000000;

 position: relative; /* ::after를 위치시키기 위해 필요 */
  cursor: pointer; /* hover 시 손가락 모양 커서 */

  /* 애니메이션을 위한 가상 요소 */
&::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px; /* 텍스트 아래 간격 */
    width: 0;
    height: 2px; /* 밑줄 두께 */
    background-color: #000; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 애니메이션 속도와 효과 */}

&:hover::after {
    width: 100%; /* hover 시 밑줄이 전체로 펼쳐짐 */


`
export default Spans;