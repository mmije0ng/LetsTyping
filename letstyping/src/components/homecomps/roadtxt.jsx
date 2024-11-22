import styled from "styled-components";
import GoButton from "./goButton";
import { useNavigate } from "react-router-dom";
import yaml from "js-yaml";
import { useState, useEffect } from "react";
import ListItemComponent from "./listitem";


const Roadtxt = () =>{
    //파일 선택 관련 
    const [data, setData] = useState([]); 
    const [selectedItem, setSelectedItem] = useState(null);
    //언어 선택
    const [language, setLanguage] = useState("kr");

    //페이지 이동
    const navigate = useNavigate();

    useEffect(() => {
        const filePath = language === "kr" ? "/typingdatas-kr.yaml" : "/typingdatas-en.yaml";
        fetch(filePath)
            .then((response) => response.text())
            .then((text) => {
                const parsedData = yaml.load(text); // YAML 데이터를 JavaScript 객체로 변환
                setData(parsedData); // 데이터 상태에 저장
            })
            .catch((error) => console.error("Error loading YAML:", error));
    }, [language]); // 언어 변경 시 파일 다시 불러오기

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    //한/영 언어 변경
    const handleLanguageChange = (lang) => {
        setLanguage(lang); 
        setSelectedItem(null); 
    };


    //버튼 클릭해서 다음 페이지로 전달 
    const handleGoButtonClick = () => {
        if (selectedItem) {
            navigate("/typing", { state: { content: selectedItem.content } });
        } else {
            // 선택된 항목이 없을 경우
            alert("타이핑 할 글을 선택해주세요!");
        }
    };

    return (
        <MainWrapp>
            <Headers>
                <LanguageButtons>
                        <LanguageButton
                            isActive={language === "kr"}
                            onClick={() => handleLanguageChange("kr")}
                        >
                            한글
                        </LanguageButton>
                        <LanguageButton
                            isActive={language === "en"}
                            onClick={() => handleLanguageChange("en")}
                        >
                            English
                        </LanguageButton>
                </LanguageButtons>
                <GoButton onClick={handleGoButtonClick} />
            </Headers>
            <Bodys>
                <ListContainer>
                    {data.map((item) => (
                        //아이템 컴포넌트 호출 
                        <ListItemComponent
                        key={item.id}
                        item={item}
                        isSelected={selectedItem && selectedItem.id === item.id}
                        onSelect={handleSelect} // 클릭 시 동작할 함수 전달
                    />
                    ))}
                </ListContainer>
    
            </Bodys>
        </MainWrapp>
    )
}

const LanguageButtons = styled.div`
    
`;

const LanguageButton = styled.button`
    background-color: ${({ isActive }) => (isActive ? "#ffcce0" : "#ffffff")};
    color: ${({ isActive }) => (isActive ? "#000" : "#555")};
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 1.2em;

    width: 130.5px;
    height: 50px;
    border-radius: 9999px;

    &:hover {
        background-color: #ffdde7;
    }
`;

const ListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    
    gap: 25px;
    width: 100%;
    padding: 16px;
    max-height: calc(100% - 40px); 
    overflow-y:auto;
`;

const Headers = styled.article`
margin-top:50px;
display:flex;
justify-content: space-between;
gap:120px;
margin-bottom:20px;
padding:20px;

    align-items: center; /* 요소가 세로로 중앙 정렬 */
    @media (max-width: 400px) {
        gap: 10px; /* 작은 화면에서 간격 줄이기 */
        justify-content: center; /* 요소 중앙 정렬 */
        
    }
`

const Bodys = styled.article`
display:flex;
min-height:80%;
`

const MainWrapp = styled.main `
display:flex;
width: 56vw;
min-width:400px;
max-width:600px;
height: 874px;
padding:20px;
background: #FFFFFF;
box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
border-radius: 8px;
flex-direction:column;
justify-content: center; 
  align-items: center; /* 세로 축 정렬 */
overflow-y: hidden;
overflow-x:hidden;
`

export default Roadtxt;