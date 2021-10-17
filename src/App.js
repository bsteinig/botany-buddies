import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignInPage, {Logout} from './pages/login';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import NotFoundPage from './pages/404';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'
import './css/style.css'

function App() {

  const [user, setUser] = useState(null);
  let userTmp = localStorage.getItem("user");
  if(userTmp){
    userTmp = JSON.parse(userTmp)
  }

  return (
    <Router>
      <Navbar user={userTmp} setUser={setUser}></Navbar>
      <Switch>
        <Route exact path="/" component={() => <Home user={userTmp}/>} />
        <Route exact path="/login" component={() => <SignInPage user={user} setUser={setUser}/>} />
        <Route exact path="/logout" component={() => <Logout setuser={setUser}/>} />
        <PrivateRoute exact path="/feed" user={userTmp} component={() => <Feed user={userTmp} />} />
        <PrivateRoute exact path="/profile" user={userTmp} component={() => <Profile user={userTmp} />} />
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" /> 
      </Switch>
    </Router>
  );
}

export default App;
