import styled from "styled-components";

//button 재사용을 위해 컴포넌트 분리함
const GoButton =({onClick}) =>{
    return(
        <Button onClick={onClick}>GO</Button>
    )
}


const Button = styled.button`
margin-left:auto;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px 24px;
gap: 8px;

width: 84px;
height: 54px;
border:none;

background: linear-gradient(90deg, #FFC7DD 0%, #B6BDF8 50%, #C2FEF7 100%);
box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.25);
border-radius: 50px;


`

export default GoButton