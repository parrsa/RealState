import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Mui
import { Grid, AppBar, Typography, Button, CardContent, CardMedia, CardHeader, Card, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useImmerReducer } from 'use-immer'
import axios from "axios";


//Contex
import DispatchContext from "../Contexts/DispatchContex";
import StateContext from "../Contexts/StateContex";

function Login() {
    const navigate = useNavigate();
    const GlobalDispatch = useContext(DispatchContext)
    const GlobalState = useContext(StateContext)

    const initialState = {
        usernameValue: '',
        passwordValue: '',
        sendRequest: 0,
        token: ''
    }

    function ReducerFuction(draft, action) {
        switch (action.type) {
            case "catchUsernameChange":
                draft.usernameValue = action.usernameChosen;
                break;

            case "catchPasswordChange":
                draft.passwordValue = action.passwordChosen;
                break;

            case "changeSendRequest":
                draft.sendRequest = draft.sendRequest + 1;
                break;

            case "catchToken":
                draft.token = action.tokenValue
        }
    }

    const [state, dispatch] = useImmerReducer(ReducerFuction, initialState)


    function FormSubmit(e) {
        e.preventDefault();
        dispatch({ type: 'changeSendRequest' })
    }

    useEffect(() => {
        if (state.sendRequest) {
            const SignIn = async () => {
                try {
                    const response = await axios.post("http://localhost:8000/api-auth-djoser/token/login/",
                        {
                            username: state.usernameValue,
                            password: state.passwordValue,
                        })
                    console.log(response)
                    dispatch({ type: "catchToken", tokenValue: response.data.auth_token });
                    // navigate('/')
                    GlobalDispatch({
                        type: "catchToken",
                        tokenValue: response.data.auth_token
                    })

                } catch (error) {
                    console.log(error.response)
                }
            }
            SignIn()
        }
    }, [state.sendRequest])

    //Get user ingo
    useEffect(() => {
        if (state.token !== '') {
            const GetUserInfo = async () => {
                try {
                    const response = await axios.get("http://localhost:8000/api-auth-djoser/users/me/",
                        {
                            headers: {
                                'Content-type': 'application/json',
                                "Authorization": `Token ${state.token}`
                            }
                        })
                    console.log(response)
                    navigate('/')
                    GlobalDispatch({
                        type: "userSignIn", usernameInfo: response.data.username, emailInfo: response.data.email, IdInfo: response.data.id, tokenValue: response.data.auth_token
                    })
                } catch (error) {
                    console.log(error.response)
                }
            }
            GetUserInfo()
        }
    }, [state.token])

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
                    <Typography variant="h4">SIGN IN</Typography>
                </Grid>

                <Grid item container style={{ marginTop: '1rem' }}>
                    <TextField id="username" label="Username" variant="outlined" value={state.usernameValue} onChange={(e) => dispatch({ type: "catchUsernameChange", usernameChosen: e.target.value })} fullWidth />
                </Grid>
                <Grid item container style={{ marginTop: '1rem' }}>
                    <TextField id="password" label="Password" variant="outlined" type="password" value={state.passwordValue} onChange={(e) => dispatch({ type: "catchPasswordChange", passwordChosen: e.target.value })} fullWidth />
                </Grid>
                <Grid item container xs={8} style={{ marginTop: '1rem', marginLeft: "auto", marginRight: "auto" }}>
                    <Button variant="contained" fullWidth type="submite" sx={{ backgroundColor: "green", color: "white", fontSize: "1.1rem", marginLeft: "1rem", "&hover": { backgroundColor: "blue" } }}>SIGN IN</Button>
                </Grid>
            </form>
            {GlobalState.globalMessage}
            <Grid item container justifyContent={"center"} style={{ marginTop: "1rem" }}>
                <Typography variant="small">Don't have an account?<span onClick={() => navigate("/register")} style={{ cursor: "pointer", color: 'green' }}>SIGN UP</span></Typography>
            </Grid>
        </div>
    )
}
export default Login