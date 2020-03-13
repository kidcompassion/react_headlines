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
import { Route, Switch, Redirect } from 'react-router-dom';


const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);
const BroadcasterIndexWithContext = withContext(BroadcasterIndex);
const HeaderWithContext = withContext(Header);
const PrivateRouteWithContext = withContext(PrivateRoute);
const ForbiddenWithContext = withContext(Forbidden);

function App() {
  return (
    <div className="App">
    <HeaderWithContext />
      <Switch>
        <Redirect exact path="/" to ="/stories/1"/>
        <PrivateRouteWithContext exact path="/stories/:id" component={BroadcasterIndexWithContext} />
        <Route exact path="/signup" component={UserSignUpWithContext} />
        <Route exact path="/signin" component={UserSignInWithContext} />
        <PrivateRouteWithContext exact path="/signout" component={UserSignOutWithContext} />
        <PrivateRouteWithContext exact path="/ctv-edmonton/:id" component={BroadcasterIndexWithContext} />
        <PrivateRouteWithContext exact path="/edmonton-journal/:id" component={BroadcasterIndexWithContext} />
        <PrivateRouteWithContext exact path="/edmonton-sun/:id" component={BroadcasterIndexWithContext} />
        <PrivateRouteWithContext exact path="/cbc-edmonton/:id" component={BroadcasterIndexWithContext} />
        <PrivateRouteWithContext exact path="/the-star-edmonton/:id" component={BroadcasterIndexWithContext} />
        <PrivateRouteWithContext exact path="/bookmarks/:id" component={BroadcasterIndexWithContext} />
        <Route path="/forbidden" component={ForbiddenWithContext} />
        <Route component = {NotFound} />
      </Switch>
    </div>
  );
}

export default App;
