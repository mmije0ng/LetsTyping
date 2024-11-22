import { useLocation } from "react-router-dom";

const Typingtest = () => {
    const location = useLocation(); 
    const inputValue = location.state?.inputValue || ""; // 전달된 데이터 확인
    const content = location.state?.content || "No content provided";

    return (
        <div>
            <h1>받아온 데이터:</h1>
            {inputValue ? (
                <p>Input Value: {inputValue}</p> // inputValue가 있을 때 출력
            ) : content ? (
                <p>Content: {content}</p> // content가 있을 때 출력
            ) : (
                <p>No data provided</p> // 아무 값도 없을 때 출력
            )}
        </div>
    );
};

export default Typingtest;