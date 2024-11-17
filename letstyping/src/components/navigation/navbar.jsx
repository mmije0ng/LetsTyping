import styled from "styled-components";
import { useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return(
        <NavWrapp>
            <Logo>Hs.photato</Logo>

            

        </NavWrapp>
    )
}

const Logo = styled.span `
width: 157px;
height: 21px;

font-family: 'Poppins';
font-style: normal;
font-weight: 700;
font-size: 27.8671px;
line-height: 20px;
/* identical to box height, or 72% */
letter-spacing: -0.01em;

color: #000000;


`

const NavSpan = styled.span`
background:pink;
`

const NavWrapp = styled.div `
    width: 100%;
    top:0;
    height : 75px;
    color: #black;
    background-color:white;
    z-index: 300;
    display: flex;
    align-items:center;
`


export default Navbar;