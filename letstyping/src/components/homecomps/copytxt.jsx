import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GoButton from "./goButton";
import { useState } from "react";


const Copytxt = () =>{
    //textarea 값 넘기기
    const [inputValue, setInputValue] = useState("");
    //페이지 이동
    const navigate = useNavigate();

    const handleNavigate = () => {
        //입력값 없으면 버튼처리 안함
        if (!inputValue.trim()) { 
            alert("내용을 입력해 주세요!");
            return;
        }
        navigate("/typing", { state: { inputValue } }); // 상태(state)로 데이터 전달
    };

    return (
        <MainWrapp>
            <Headers>
                <div>
                    <SPAN>직접 가져올래요 </SPAN> 
                    <img src="images/WHand.png" alt = "Hand" style={{width:'1.2em'}}/>
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
gap:170px;
margin-bottom:20px;

`

const SPAN = styled.span `
font-family: 'Montserrat';
font-style: normal;
font-weight: 500;
font-size: 1.8em;
line-height: 30px;
width:100%;

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
width:50vw;
min-width:200px;
max-width: 500px;
height: 874px;
padding:30px;

align-items: center; /* 세로 축 정렬 */

background: #FFFFFF;
box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
border-radius: 8px;

`

export default Copytxt