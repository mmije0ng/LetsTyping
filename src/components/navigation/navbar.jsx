import styled from "styled-components";
import { useNavigate, useLocation} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import React, {useState, useEffect, useRef} from "react";
import { GiSoundOn } from "react-icons/gi";
import { GiSoundOff } from "react-icons/gi";
import { Howl } from "howler"; // howler.js import
import { useUserContext } from "../../context/username";
import navimg from "../../assets/images/navimg.png"

const Navbar = () => {
    const { userName } = useUserContext();
    const [showMenu, setShowMenu] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 980 });
    const navigate = useNavigate();
    const location = useLocation(); 

    //배경음악
    const [isPlaying, setIsPlaying] = useState(true);

    //특정 경로에서 배경 이미지 추가 
    const isSpecialRoute = ["/typing", "/result", "/ranking"].includes(location.pathname);
    

    // Howler 인스턴스 생성 및 유지
    const backgroundMusicRef = useRef(
        new Howl({
            src: ["/audio/background.mp3"], // 배경음악 경로
            loop: true, // 반복 재생
            volume: 0.2, // 초기 볼륨
        })
    );

    // 음악 재생/정지 상태 관리
    useEffect(() => {
        const backgroundMusic = backgroundMusicRef.current;

        // 컴포넌트가 처음 로드되었을 때 음악 시작
        backgroundMusic.play();

        return () => {
            // 컴포넌트가 언마운트되면 음악 정지
            backgroundMusic.stop();
        };
    }, []);

    // 음악 재생/정지 토글
    const toggleMusic = () => {
        const backgroundMusic = backgroundMusicRef.current;

        if (isPlaying) {
            // 음악 일시정지
            backgroundMusic.pause();
        } else {
            // 정지한 위치에서 재개
            backgroundMusic.play();
        }

        setIsPlaying((prevState) => !prevState);
    };

    return(
        <NavWrapp isSpecialRoute={isSpecialRoute}>
            <Logo onClick={() => navigate("/")}>Hs.photato</Logo>
            
            
            <ListWrapp>
                {isSpecialRoute && userName && (
                    <UserNameSpan>{userName} 
                        <span>님의 타이핑🐱</span></UserNameSpan>
                    
                )}
                <NavSpan onClick={()=>{navigate("/ranking")}}>ranking</NavSpan>
                    {/* 아이콘 누르면 소리 끄고키고 가능함 */}
                    {isPlaying ? (
                        <SoundIcon as={GiSoundOn} onClick={toggleMusic} />
                    ) : (
                        <SoundIcon as={GiSoundOff} onClick={toggleMusic} />
                    )}
                </ListWrapp>
                
        </NavWrapp>
    )
};

const SoundIcon = styled.div`
    cursor: pointer;
    font-size: 35px; !important;
    color:#3B170B;   
    margin-right: 10px;
    margin-left:30px;
`;

const UserNameSpan = styled.div`
    display: flex; /* 텍스트와 이모티콘을 한 줄로 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    gap: 5px; /* 텍스트와 이모티콘 사이 간격 */
    white-space: nowrap; /* 줄바꿈 방지 */
    margin-right: 20px; /* 오른쪽 여백 */
    font-size: 14px;
    font-weight: 600;
    color: black;

    span {
        font-weight: 500; /* 이모티콘 텍스트의 가중치 조정 */
        font-size: 14px;
    }
`;

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
margin-right: 160px;
align-items: center; 
margin-left: auto; 
right:0;
margin-bottom:15%;
display:flex;
flex-direction:row;
`

const Logo = styled.span `
margin-left:280px;
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


const NavSpan = styled.span`
width: auto;
height: 21px;
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 15px;
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
    width: 90%; /* hover 시 밑줄이 전체로 펼쳐짐 */


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
    isSpecialRoute ? `url(${navimg}) no-repeat center / cover` : "white"};
`


export default Navbar;
