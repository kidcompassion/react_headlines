import React from 'react';
import './App.scss';
import BroadcasterIndex from './Components/BroadcasterIndex.js';
import Header from './Components/Header';
import UserSignIn from './Components/UserSignIn.js';
import UserSignUp from './Components/UserSignUp.js';
import UserSignOut from './Components/UserSignOut.js';
import NotFound from './Components/NotFound';
import Forbidden from './Components/Forbidden';
import PrivateRoute from './PrivateRoute';
import { withContext }  from './Context';
import { Route, Switch } from 'react-router-dom';


const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const BroadcasterIndexWithContext = withContext(BroadcasterIndex);
const HeaderWithContext = withContext(Header);
const PrivateRouteWithContext = withContext(PrivateRoute);


function App() {
  return (
    
    <div className="App">
    <HeaderWithContext />
      
      <Switch>

    
          <PrivateRouteWithContext exact path="/stories/:id" component={BroadcasterIndexWithContext} />
          <PrivateRouteWithContext exact path="/ctv-edmonton/:id" component={BroadcasterIndexWithContext} />
          <PrivateRouteWithContext exact path="/edmonton-journal/:id" component={BroadcasterIndexWithContext} />
          <PrivateRouteWithContext exact path="/edmonton-sun/:id" component={BroadcasterIndexWithContext} />
          <PrivateRouteWithContext exact path="/cbc-edmonton/:id" component={BroadcasterIndexWithContext} />
          <Route exact path="/signin" component={UserSignInWithContext} />
          <PrivateRouteWithContext exact path="/signout" component={UserSignOutWithContext} />
          <PrivateRouteWithContext exact path="/bookmarks" component={BroadcasterIndexWithContext} />
          <Route exact path="/signup" component={UserSignUp} />
          
          <Route path="/forbidden" component={Forbidden} />
          <Route component = {NotFound} />
        </Switch>
    </div>
  );
}

export default App;
