import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Copytxt = () =>{
    const navigate = useNavigate();
    return (
        <MainWrapp>
            직접 가져올래요 
            <Button onClick={() => navigate("/typing")}>
                GO
            </Button>
            <Input placeholder="이곳에 붙여넣기 하세요."/>
        </MainWrapp>
    )
}
const Button = styled.button`

`

const Input = styled.input `
width:95%;
height:80%;
border:none;
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