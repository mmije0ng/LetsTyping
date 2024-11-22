import styled from "styled-components";
import Copytxt from "./copytxt";
import Roadtxt from "./roadtxt";

const HomeSecond = ({name}) => {
    return(
    <MainWrapp>
        <Hello>
            안녕하세요, <br></br>
            <span style={{fontWeight:600}}>{name}</span> 님!
            <img src="/images/HHand.png"/>
        </Hello>
        <BoxWrapp>
                <Roadtxt />
                <Copytxt />
        </BoxWrapp>
        
    </MainWrapp>
    )
}

const BoxWrapp = styled.article`
display:flex;
flex-direction:row;
gap:30px;
`

const MainWrapp = styled.main`
display:flex;
margin-top:100px;
flex-direction:column;


`

const Hello = styled.span`

margin-right: auto; 
font-family: 'Montserrat';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 44px;

color: #080808;
margin-bottom:100px;



`

export default HomeSecond;