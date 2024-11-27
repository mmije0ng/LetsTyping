import styled from "styled-components";
import Copytxt from "./copytxt";
import Roadtxt from "./roadtxt";
import { useState } from "react";

const HomeSecond = ({name}) => {
    //고양이 선택 여부 관리
    const [selectedCat, setSelectedCat] = useState(null);

    const cats = [
        { id: 1, src: "/images/CatY.png", alt: "Yellow Cat" },
        { id: 2, src: "/images/CatB.png", alt: "Black Cat" },
    ];

    const handleCatClick = (id) => {
        setSelectedCat(id); // 선택된 고양이 ID 업데이트
        };

    return(
    <MainWrapp>
        
        <>
        <Hello>
            안녕하세요, <br/>
            <span style={{fontWeight:600}}>{name}</span> 님! 👋
            
        </Hello>
        </>
        
        <CatWrapp>
            <SpanCat>함께 할 고양이를 선택해 주세요</SpanCat>
            <CatContainer>
            {cats.map((cat) => (
                <CatImage
                key={cat.id}
                src={cat.src}
                alt={cat.alt}
                isSelected={cat.id === selectedCat}
                onClick={() => handleCatClick(cat.id)} 
                />
            ))}
            </CatContainer>
        </CatWrapp>
        <BoxWrapp>
                <Roadtxt selectedCat={selectedCat} name={name} />
                <Copytxt selectedCat={selectedCat} name = {name}/>
        </BoxWrapp>
        
    </MainWrapp>
    )
}

const CatContainer = styled.div`
    display: flex;
    gap: 60px;
    margin-bottom:150px;
`;

const CatImage = styled.img`
    width: 15vw; 
    height: auto; 
    max-width: 150px;
    max-height: 150px; 
    cursor: pointer;
    border: ${({ isSelected }) => (isSelected ? "4px solid red" : "4px solid transparent")};
    border-radius: 8px;
    transition: border 0.3s ease;

    &:hover {
        border: ${({ isSelected }) => (isSelected ? "4px solid red" : "4px solid lightgray")};
    }
`;

const CatWrapp = styled.article`
margin-top:20px;
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
`

const SpanCat = styled.span`
font-family: 'Montserrat';
font-style: normal;
font-weight: 500;
font-size: clamp(20px, 2vw, 36px);
color: #000000;
justify-content: center;
margin-bottom:60px;
`

const BoxWrapp = styled.article`

display:flex;
flex-direction:row;
gap:30px;
justify-content: center;
align-item: center;
margin:20px;
box-sizing: border-box; 
width:95%;


@media (max-width: 768px) { 
        flex-direction: column; 
        gap: 20px; 
    }
`

const MainWrapp = styled.main`
display:flex;
width:100vw;
margin-top:100px;
flex-direction:column;
padding:10px;
transform: scale(0.6);
`

const Hello = styled.div`
margin-right: auto; 
margin-left:30px;

font-family: 'Montserrat';
font-style: normal;
font-weight: 400;
font-size: 36px;

color: #080808;
margin-bottom:100px;

@media (max-width: 768px) {
        font-size: 24px;
        line-height: 32px;
        margin-bottom: 50px;
    }

    @media (max-width: 480px) {
        font-size: 18px;
        line-height: 28px;
        margin-bottom: 30px;
    }


`

export default HomeSecond;