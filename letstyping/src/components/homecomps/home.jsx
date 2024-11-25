import styled from "styled-components";
import logoimage from "../../assets/images/MainLogo.png"
import HomeSecond from "./responsecomp";
import React, { useState, useEffect, useRef } from "react";



const HomeComp = () => {
    const [name, setName] = useState(""); //이름 입력 상태 저장 
    const [showHomeSecond, setShowHomeSecond] = useState(false); //Homesecond 렌더링
    const logoRef = useRef(null);

    useEffect(() => {
        const scrollToLogo = () => {
            if (logoRef.current) {
                logoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

        // DOM 로드 후 실행
        setTimeout(scrollToLogo, 0); // 비동기로 실행하여 렌더링 완료 후 동작
    }, []); // 빈 배열로 설정하여 첫 렌더링 시 한 번만 실행

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && name.trim() !== "") {
        // 엔터를 누르고 입력값이 있을 경우
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

                {showHomeSecond && <HomeSecond name={name} />}
        </MainWrapp>
    )
}

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