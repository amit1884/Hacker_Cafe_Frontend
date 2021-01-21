import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile'
import MobileNav from './components/MobileNav'
import {reducer,initialState} from "./Reducers/userReducer"
import Media from 'react-media';
export const UserContext=createContext()
const Routing=()=>{

  const history=useHistory()
  const {dispatch}=useContext(UserContext)
  useEffect(()=>{

    const user=JSON.parse(localStorage.getItem("user"))

    console.log(user)
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push("/login")
    }
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
      <Route path="/profile">
        <Profile/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
      <UserContext.Provider value ={{state,dispatch}}>
        <BrowserRouter>
        <Media queries={{
          small: "(max-width: 991px)",
          large: "(min-width: 991px)"
        }}>
          {matches => (
            <React.Fragment>
              {matches.small && <MobileNav/>}
              {matches.large && <Navbar/>}
            </React.Fragment>
          )}
        </Media>
          <Routing/>
        </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
