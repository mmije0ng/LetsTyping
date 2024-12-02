import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

// Context를 제공하는 Provider 컴포넌트
export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState("");

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
};

// Context를 사용하는 커스텀 Hook
export const useUserContext = () => useContext(UserContext);