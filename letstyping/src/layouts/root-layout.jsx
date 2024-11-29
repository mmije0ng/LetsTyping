import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/navbar";
import styled from "styled-components";
import { UserProvider } from "../context/username";

const RootLayout = () => {
    return(
        <UserProvider>
            <LayoutContainer>
            <Navbar/>
            <Outlet/>
            </LayoutContainer>
        </UserProvider>
        
    )
}

const LayoutContainer = styled.div `
    display: flex;
    flex-direction: column;
    
    height: 100vh;
    width: 100%;

`

export default RootLayout;