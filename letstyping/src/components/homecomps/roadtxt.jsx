import styled from "styled-components";
import GoButton from "./goButton";
import { useNavigate } from "react";
import yaml from "js-yaml";
import { useState, useEffect } from "react";

const Roadtxt = () =>{
    //파일 선택 관련 
    const [data, setData] = useState([]); 
    const [selectedItem, setSelectedItem] = useState(null);

    //페이지 이동
    //const navigate = useNavigate();

     // YAML 파일 불러오기
    useEffect(() => {
        fetch("/typingdatas-kr.yaml") // YAML 파일 경로
            .then((response) => response.text()) // 텍스트 형식으로 불러옴
            .then((text) => {
                const parsedData = yaml.load(text); // YAML 데이터를 JavaScript 객체로 변환
                setData(parsedData); // 데이터 상태에 저장
            })
            .catch((error) => console.error("Error loading YAML:", error));
    }, []);

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    return (
        <MainWrapp>
            <Headers>
                <div>
                    뜌 어 어 어 
                </div>
                <GoButton />
            </Headers>
            <ListContainer>
                {data.map((item) => (
                    <ListItem key={item.id} onClick={() => handleSelect(item)}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                    </ListItem>
                ))}
            </ListContainer>
            {selectedItem && (
                <SelectedItemDetails>
                    <h3>선택된 항목</h3>
                    <p><strong>제목:</strong> {selectedItem.title}</p>
                    <p><strong>내용:</strong> {selectedItem.content}</p>
                </SelectedItemDetails>
            )}
        </MainWrapp>
    )
}

const SelectedItemDetails = styled.div`
    margin-top: 20px;
    padding: 16px;
    background-color: #eef6ff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 16px;
`;

const ListItem = styled.div`
    background-color: #f5f5f5;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    h3 {
        margin: 0;
        font-size: 18px;
    }
    p {
        margin: 0;
        font-size: 14px;
        color: #555;
    }
`;

const Headers = styled.article`
display:flex;
justify-content: space-between;
gap:170px;
margin-bottom:20px;
`

const MainWrapp = styled.main `
display:flex;
width: 608px;
height: 874px;
background: #FFFFFF;
box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
border-radius: 8px;
flex-direction:column;
justify-content: center; /* 필요에 따라 정렬 옵션 추가 */
  align-items: center; /* 세로 축 정렬 */
`

export default Roadtxt