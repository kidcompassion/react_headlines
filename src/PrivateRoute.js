import React from 'react';
import { Route, Redirect } from 'react-router-dom';

  const PrivateRoute = ({ component: Comp, path, ...rest }) => {
    
  return (
    
      <Route
    {...rest}
    render={props => {
      return rest.context.authenticatedUser!== null ? (
        <Comp {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/forbidden",
            state: {
              state: { from: props.location }
            },
          }}
        />
      );
    }}
  />
    )}
    
    
    
    
    
    /*
    <Consumer>
      {context => (
        
        <Route
          {...rest}
          
          render={(props) => (
            
            context.authenticatedUser ? 
              
              <Component {...props} />
              
             : 
              <Redirect to={{
                pathname: '/forbidden',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
};*/

export default PrivateRoute;