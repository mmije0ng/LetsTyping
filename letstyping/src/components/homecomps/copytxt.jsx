import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GoButton from "./goButton";


const Copytxt = () =>{
    const navigate = useNavigate();
    return (
        <MainWrapp>
            <Headers>
                <div>
                    <SPAN>직접 가져올래요 </SPAN> 
                    <img src="images/WHand.png"/>
                </div>
                <GoButton onClick={() => navigate("/typing")}/>
            </Headers>
            
            
            <Input placeholder="이곳에 붙여넣기 하세요."/>
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
font-size: 24.7708px;
line-height: 30px;

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
width: 553px;
height: 874px;

justify-content: center; /* 필요에 따라 정렬 옵션 추가 */
  align-items: center; /* 세로 축 정렬 */

background: #FFFFFF;
box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
border-radius: 8px;

`

export default Copytxt