import styled from "styled-components";
import logoimage from "../../assets/images/MainLogo.png"
import HomeSecond from "./responsecomp";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/username";


const HomeComp = () => {
    const { setUserName } = useUserContext(); // 이름 설정 함수 가져오기
    console.log('Window width:', window.innerWidth);
    console.log('Window height:', window.innerHeight);
    const [name, setName] = useState(""); //이름 입력 상태 저장 
    const [showHomeSecond, setShowHomeSecond] = useState(false); //Homesecond 렌더링
    const logoRef = useRef(null);//스크롤 참조
    const homeSecondRef = useRef(null); //스크롤 참조

    //처음에 로고가 있는 화면으로 이동 
    useEffect(() => {
        const scrollToLogo = () => {
            if (logoRef.current) {
                logoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

        // DOM 로드 후 실행
        setTimeout(scrollToLogo, 0); // 비동기로 실행하여 렌더링 완료 후 동작
    }, []); // 빈 배열로 설정하여 첫 렌더링 시 한 번만 실행

    //이름 입력 후 두번째 컴포넌트로 이동
    useEffect(() => {
        if (showHomeSecond && homeSecondRef.current) {
            // HomeSecond가 렌더링된 후 해당 위치로 스크롤
            homeSecondRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

            setTimeout(() => {
                window.scrollBy({ top: 520, left: 0, behavior: "smooth" }); 
            }, 300); // smooth scrolling 완료 후 실행
        }
    }, [showHomeSecond]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && name.trim() !== "") {
        // 엔터를 누르고 입력값이 있을 경우
        setUserName(name);  //전역상태에 이름 저장해서 내비바에서 호출예정 
        setShowHomeSecond(true);
        }
    };

    const handleChange =(event) => {
        setName(event.target.value);
    }


    
    
    return (
        <MainWrapp>
            <Logo ref={logoRef} src={logoimage} alt="mainlogo" />
            <InputComp 
                type={'text'} 
                placeholder="Your name" 
                value={name} //name 전달 프롭스
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                />

                {showHomeSecond && 
                    <HomeSecondWrapper ref={homeSecondRef}>
                        <HomeSecond name={name} />
                    </HomeSecondWrapper>}
        </MainWrapp>
    )
}

const HomeSecondWrapper = styled.div`
    width: 100%;
`;


const InputComp = styled.input `
box-sizing: border-box;

width: 200px;
height: 50px;
left: 620px;
text-align:center;
top: 897px;

background: #FFFFFF;
border: 1.16113px solid #000000;
border-radius: 30.1894px;

`

const MainWrapp = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    
    flex-direction:column;
    padding-bottom:100px;
`

const Logo = styled.img `
max-width:1000px;
width:90%;
height:auto;
`

export default HomeComp;