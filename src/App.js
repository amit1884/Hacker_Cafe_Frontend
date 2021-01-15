import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import {reducer,initialState} from "./Reducers/userReducer"
export const UserContext=createContext()
const Routing=()=>{

  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{

    const user=JSON.parse(localStorage.getItem("user"))

    console.log(user)
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    }
    // else{
    //   if(!history.location.pathname.startsWith('/reset'))
    //   history.push("/login")
    // }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/signup">
        <SignUp/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
      <UserContext.Provider value ={{state,dispatch}}>
        <BrowserRouter>
          <Navbar/>
          <Routing/>
        </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
