import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/navbar";
import styled from "styled-components";

const RootLayout = () => {
    return(
        <LayoutContainer>
            <Navbar/>
            <Outlet/>
        </LayoutContainer>
    )
}

const LayoutContainer = styled.div `
    display: flex;
    flex-direction: column;
    
    height: 100vh;
    width: 100%;

`

export default RootLayout;