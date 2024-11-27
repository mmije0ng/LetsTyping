import styled from "styled-components";
import { useNavigate, useLocation} from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useMediaQuery } from "react-responsive";
import Spans from "./spans";
import React, {useState} from "react";



const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 980 });
    const navigate = useNavigate();
    const location = useLocation(); 

    //특정 경로에서 배경 이미지 추가 
    const isSpecialRoute = ["/upload", "/typing", "/result", "/ranking"].includes(location.pathname);
    
    return(
        <NavWrapp isSpecialRoute={isSpecialRoute}>
            <Logo onClick={() => navigate("/")}>Hs.photato</Logo>

            
                {isMobile? (
                    <>
                    <GiHamburgerMenu
                        style={{ marginBottom: "15%",marginRight:'20px', cursor: "pointer" }}
                        onClick={() => setShowMenu(!showMenu)} // 토글 동작
                    />
                    {showMenu && ( // showMenu가 true일 때만 표시
                        <MenuContainer>
                            <Spans />
                        </MenuContainer>
                    )}
                </>
                ):(
                    <ListWrapp>
                        <Spans />
                    </ListWrapp>
                )}
                

        </NavWrapp>
    )
}

const MenuContainer = styled.div`
    top: 100%; /* 내비게이션 아래로 */
    width: 200px; /* 메뉴 너비 */
    background-color: white; /* 메뉴 배경색 */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
    padding: 10px;
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    gap: 10px; /* 항목 간 간격 */
`;
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
margin-right:30px;

color: #000000;
`



const NavWrapp = styled.nav `
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