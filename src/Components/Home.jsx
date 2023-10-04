import React from "react";
import city from './Assets/city.jpg'
import { Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

const OvevrlayText = styled('div')(({ theme }) => ({
    position: 'absolute',
    zIndex: "100",
    top: '100px',
    left: '20px',
    textAlign: "center"
}))

const Home = () => {
    return (
        <>
            <div style={{ position: 'relative' }}>
                <img src={city} style={{ width: "100%", height: "92vh" }} alt="images" />
                <OvevrlayText>
                    <Typography variant="h1" sx={{ color: "white", fontWeight: 'bold' }}>FIND YOUR <span style={{ color: "green" }}>NEXT PROPERTY</span>  ON THE LBREP WEBSITE </Typography>
                    <Button variant="contained" sx={{ fontSize: "3.5rem", borderRadius: "15px", backgroundColor: "green", marginTop: "2rem", boxShadow: "3px 3px 3px white" }}>SEE ALL PROPERTIES</Button>
                </OvevrlayText>
            </div>

        </>
    )
}
export default Home