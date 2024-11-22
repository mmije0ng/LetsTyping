import styled from "styled-components";
import { useNavigate, useLocation} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); 

    //특정 경로에서 배경 이미지 추가 
    const isSpecialRoute = ["/","/upload", "/typing", "/result", "/ranking"].includes(location.pathname);
    
    return(
        <NavWrapp isSpecialRoute={isSpecialRoute}>
            <Logo onClick={() => navigate("/")}>Hs.photato</Logo>

            <ListWrapp>
                <NavSpan>Home</NavSpan>
                <NavSpan>Upload</NavSpan>
                <NavSpan>typing</NavSpan>
                <NavSpan>result</NavSpan>
                <NavSpan>ranking</NavSpan>
            </ListWrapp>

        </NavWrapp>
    )
}

const ListWrapp = styled.div `
margin-right: 240px;
align-items: center; 
margin-left: auto; 
right:0;
margin-bottom:15%;
`

const Logo = styled.span `
margin-left:240px;
width: 157px;
height: 21px;
margin-bottom:15%;

font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 27.8671px;
line-height: 20px;
/* identical to box height, or 72% */
letter-spacing: -0.01em;
cursor: pointer;

color: #000000;
`

const NavSpan = styled.span`
width: 52px;
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

const NavWrapp = styled.div `
    display:flex;
    width: 100%;
    top:0;
    min-height : 300px;
    height:auto;
    color: #black;
    background-color:white;
    z-index: 300;
    display: flex;
    align-items:center;
    background:pink;

    background: ${({ isSpecialRoute }) =>
    isSpecialRoute ? "url('/images/navimg.png') no-repeat center / cover" : "white"};
`


export default Navbar;