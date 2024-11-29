import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GoButton from "./goButton";
import { useState } from "react";


const Copytxt = ({selectedCat, name}) =>{
    //textarea 값 넘기기
    const [inputValue, setInputValue] = useState("");
    //페이지 이동
    const navigate = useNavigate();
     // 최대 줄 수 제한
    const MAX_LINES = 5;
    const handleNavigate = () => {
        //const value = e.target.value;

        //고양이 선택 안하면 경고창
        if (!selectedCat) {
            alert("고양이를 선택해주세요!");
            return;
        }
    

        // 현재 줄 개수 계산
        const lineCount = inputValue.split("\n").length;

        // 최대 줄 수를 초과하지 않도록 제한
        if (lineCount > MAX_LINES) {
            alert(`최대 ${MAX_LINES}줄까지만 입력 가능합니다.`);
            return;
        }
        //입력값 없으면 버튼처리 안함
        if (!inputValue.trim()) { 
            alert("내용을 입력해 주세요!");
            return;
        }
        // navigate("/typing", { state: { inputValue, selectedCat } });
        navigate("/typing", {
                state: {
                content: { id: "manual", content: inputValue }, // 전달하는 데이터
                name,
                selectedCat,
                isCopy: true,
                },
          }); // 상태(state)로 데이터 전달
    };

    return (
        <MainWrapp>
            <Headers>
                <div>
                    <SPAN>직접 가져올래요 ✍️</SPAN> 
                </div>
                <GoButton onClick={handleNavigate}/>
            </Headers>
            
            
            <Input placeholder="이곳에 붙여넣기 하세요."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
        </MainWrapp>
    )
}

const Headers = styled.article`
display:flex;
justify-content: space-between;
gap:160px;
margin-bottom:20px;
margin-top:45px;
align-items:center;

`

const SPAN = styled.span `
font-family: 'Montserrat';
font-style: normal;
font-weight: 500;
font-size: 1.8em;
line-height: 30px;
width:100%;
margin-top:50px;

color: #080808;


`


const Input = styled.textarea `
width:80%;
height:80%;
border:none;
font-size: 20px;
resize: none;

`

const MainWrapp = styled.main `
display:flex;
flex-direction:column;
width:56vw;
min-width:200px;
max-width: 600px;
height: 874px;
padding:30px;

align-items: center; /* 세로 축 정렬 */

background: #FFFFFF;
box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
border-radius: 8px;

`

export default Copytxt