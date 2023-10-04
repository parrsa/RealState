import Reac, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import { CssBaseline } from '@mui/material';
import { useImmerReducer } from 'use-immer';


// Component
import Header from './Components/Header';
import Listngs from './Components/Listings';
import Register from './Components/Register';
import Login from './Components/Login';
import AddProperty from './Components/AddProperty';

//Context
import DispatchContext from './Contexts/DispatchContex';
import StateContext from './Contexts/StateContex';

function App() {

  const initialState = {
    userUsername: localStorage.getItem('theuserUsername'),
    userEmail: localStorage.getItem('theuserEmail'),
    userId: localStorage.getItem('theuserId'),
    userToken: localStorage.getItem('theuserToken'),
    userIsLogged: localStorage.getItem('theuserUsername') ? true : false,
  }

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchToken":
        draft.userToken = action.tokenValue;
        break;
      case "userSignIn":
        draft.userUsername = action.usernameInfo;
        draft.userEmail = action.emailInfo;
        draft.userId = action.IdInfo;
        draft.userToken = action.tokenValue;
        draft.userIsLogged = true;
        break;
      case 'logout':
        draft.userIsLogged = false;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState)

  useEffect(() => {
    if (state.userIsLogged) {
      localStorage.setItem('theuserUsername', state.userUsername)
      localStorage.setItem('theuserEmail', state.userEmail)
      localStorage.setItem('theuserId', state.userId)
      localStorage.setItem('theuserToken', state.userToken)
    }
    else {
      localStorage.removeItem('theuserUsername')
      localStorage.removeItem('theuserEmail')
      localStorage.removeItem('theuserId')
      localStorage.removeItem('theuserToken')
    }
  }, [state.userIsLogged])

  return (
    <div className="App">
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Header />
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/listing' element={<Listngs />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/addproperty' element={<AddProperty />} />
          </Routes>
        </DispatchContext.Provider>
      </StateContext.Provider>

    </div>
  );
}

export default App;
