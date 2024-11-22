import { useLocation } from "react-router-dom";

const Typing = () => {
    const location = useLocation(); 
    const inputValue = location.state?.inputValue || ""; // 전달된 데이터 확인

    return (
        <div>
            <h1>받아온 데이터:</h1>
            <p>{inputValue}</p>
        </div>
    );
};

export default Typing;