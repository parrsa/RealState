import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
// import Mui
import { Grid, Typography, Button, TextField } from '@mui/material';
import { useImmerReducer } from 'use-immer'

function Register() {
    const navigate = useNavigate() 

    const initialState = {
        usernameValue: '',
        emailVlue: '',
        passwordValue: '',
        password2Value: '',
        sendRequest: 0
    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case "catchUsernameChange":
                draft.usernameValue = action.usernameChosen;
                break;

            case "catchEmailChange":
                draft.emailVlue = action.emailChosen;
                break;


            case "catchPasswordChange":
                draft.passwordValue = action.passwordChosen;
                break;


            case "catchPassword2Change":
                draft.password2Value = action.password2Chosen;
                break;

            case "changeSendRequest":
                draft.sendRequest = draft.sendRequest + 1;
                break;

        }
    }
    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState)

    function FormSubmit(e) {
        e.preventDefault();
        dispatch({ type: 'changeSendRequest' })
    }
    useEffect(() => {
        if (state.sendRequest) {
            const SignUp = async () => {
                try {
                    const response = await axios.post("http://localhost:8000/api-auth-djoser/users/",
                        {
                            username: state.usernameValue,
                            email: state.emailVlue,
                            password: state.passwordValue,
                            re_password: state.password2Value
                        })
                    console.log(response)
                    navigate('/')
                } catch (error) {
                    console.log(error.response)
                }
            }
            SignUp()
        }
    }, [state.sendRequest])

    return (
        <div style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: '3rem',
            border: "5px solid black",
            padding: "3rem"
        }}>
            <form onSubmit={FormSubmit}>
                <Grid item container justifyContent={"center"}>
                    <Typography variant="h4">CREATE AN ACCOUNT</Typography>
                </Grid>
                <Grid item container style={{ marginTop: '1rem' }}>
                    <TextField id="username" label="Username" variant="outlined" value={state.usernameValue} onChange={(e) => dispatch({ type: "catchUsernameChange", usernameChosen: e.target.value })} fullWidth />
                </Grid>
                <Grid item container style={{ marginTop: '1rem' }}>
                    <TextField id="email" label="Email" variant="outlined" value={state.emailVlue} onChange={(e) => dispatch({ type: "catchEmailChange", emailChosen: e.target.value })} fullWidth />
                </Grid>
                <Grid item container style={{ marginTop: '1rem' }}>
                    <TextField id="password" label="Password" variant="outlined" type="password" value={state.passwordValue} onChange={(e) => dispatch({ type: "catchPasswordChange", passwordChosen: e.target.value })} fullWidth />
                </Grid>
                <Grid item container style={{ marginTop: '1rem' }}>
                    <TextField id="confirmpassword" label="Confirm Password" variant="outlined" type="password" value={state.password2Value} onChange={(e) => dispatch({ type: "catchPassword2Change", password2Chosen: e.target.value })} fullWidth />
                </Grid>

                <Grid item container xs={8} style={{ marginTop: '1rem', marginLeft: "auto", marginRight: "auto" }}>
                    <Button variant="contained" fullWidth type="submite" sx={{ backgroundColor: "green", color: "white", fontSize: "1.1rem", marginLeft: "1rem", "&hover": { backgroundColor: "blue" } }}>SIGN UP</Button>
                </Grid>
            </form>
            <Grid item container justifyContent={"center"} style={{ marginTop: "1rem" }}>
                <Typography variant="small">Already have an account?<span onClick={() => navigate('/login')} style={{ cursor: "pointer", color: 'green' }}>SIGN IN</span></Typography>
            </Grid>
        </div>
    )
}
export default Register