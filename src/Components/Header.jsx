import React, { useContext } from "react";
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { styled } from '@mui/material/styles';
import {useNavigate } from "react-router-dom";

//Cotext
import StateContext from "../Contexts/StateContex";
import DispatchContext from "../Contexts/DispatchContex";
import axios from "axios";


const LeftNav = styled('div')(({ theme }) => ({
    marginRight: "auto",
}));

const RightNav = styled('div')(({ theme }) => ({
    marginRight: "10px",
    marginLeft: "auto"
}));


const Header = () => {
    const navigate = useNavigate()
    const GlobalState = useContext(StateContext)
    const GlobalDispatch = useContext(DispatchContext)

    const [anchorEl, setAnchorEl] = React.useState(null)
    const opne = Boolean(anchorEl)

    const handelClose = () => {
        setAnchorEl(null)
    }

    const handelClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    async function HandleLogout() {
        setAnchorEl(null)
        try {
            const response = await axios.post('http://localhost:8000/api-auth-djoser/token/login/', GlobalState.token, {
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": `Token ${GlobalState.token}`
                }
            })
            console.log(response)
            GlobalDispatch({ type: "logout" })
            navigate('/')
        } catch (e) {
            console.log(e.response)
        }
        // localStorage.removeItem('theuserUsername')
        // localStorage.removeItem('theuserEmail')
        // localStorage.removeItem('theuserId')
        // localStorage.removeItem('theuserToken')
    }

    return (
        <AppBar position="static" style={{ backgroundColor: "black" }}>
            <Toolbar>
                <LeftNav>
                    <Button onClick={() => navigate('/')} color="inherit"><Typography variant="h4">LBREP</Typography></Button>
                </LeftNav>
                <div>
                    <Button color="inherit" style={{ marginRight: '2rem' }} onClick={() => navigate('/listing')} > <Typography variant="h6" >Listings</Typography></Button>
                    <Button color="inherit" style={{ marginLeft: '2rem' }} > <Typography variant="h6">Agencies</Typography> </Button>
                </div>
                <RightNav>
                    <Button color="inherit" sx={{ backgroundColor: "green", color: "white", width: "15rem", fontSize: "1.1rem", marginLeft: "1rem", '&:hover': { backgroundColor: "blue" } }} onClick={() => navigate('/addproperty')}  >Add Property</Button>

                    {GlobalState.userIsLogged ?
                        <Button color="inherit" sx={{ backgroundColor: "white", color: "black", width: "15rem", fontSize: "1.1rem", marginLeft: "1rem", '&:hover': { backgroundColor: "green" } }} onClick={handelClick} >
                            {GlobalState.userUsername}
                        </Button> :
                        <Button color="inherit" sx={{ backgroundColor: "white", color: "black", width: "15rem", fontSize: "1.1rem", marginLeft: "1rem", '&:hover': { backgroundColor: "green" } }} onClick={() => navigate('/login')} >
                            login
                        </Button>
                    }

                    <Menu id="basic-menu" anchorEl={anchorEl} open={opne} onClose={handelClose} MenuListProps={{ 'aria-labelledby': "basic-button" }}>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem onClick={HandleLogout}>Logout</MenuItem>
                    </Menu>
                </RightNav>
            </Toolbar>
        </AppBar>
    )
}
export default Header