import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext(); 

export class Provider extends Component {

    constructor() {
        super();
        
        // Set authenticated user to either null or the value from localstorage
        this.state = {
            authenticatedUser: JSON.parse(localStorage.getItem('authenticatedUser')) || null,
            allStories: []
        };
    }

    render() {
        
        const { authenticatedUser } = this.state;
        const { allStories } = this.state;
        const value = {
            authenticatedUser,
            allStories,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
                updateStories: this.updateStories,
                getAllStories: this.getAllStories
            },
        };
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>  
        );
    }


    /**
     * Context Methods
     */

  
    /**
     * Handles user sign in, and updates from the global space so we can trigger a state change that will update the header
     * {Object} User
     */
    signIn = ( user )=>{
     console.log(user);
        // Encode form values
        const encodedCredentials = btoa(`${user.emailAddress}:${user.password}`);
        // Set encoded values as authorization header in login request
        const authorized = axios.get('http://localhost:5000/api/users', { user, headers: {"Authorization" : `Basic ${encodedCredentials}`} });
        
        authorized.then(                
            (response) => { 
                // once logged in, save user data in localStorage
                localStorage.setItem('authenticatedUser', JSON.stringify(response.data));
                // save encoded credentials for use in other API calls
                localStorage.setItem('authHeader', encodedCredentials);
                // Add authenticated user to the current state
                this.setState({authenticatedUser: response.data});
            }).catch(
            (err)=>{
                // If error, log it to the console
                console.log(err);
                // If server error, redirect to expected error msg
                if(err.response.status === 500){
                    this.props.history.push('/error')
                } else { // else show inline validation errors
                    this.setState({errors: [err.response.data.message]});
                }
            }
        )
    }


    /**
     * Handle user signin out of app
     */
    signOut = () =>{
        let currentComponent = this;
        // Remove user from localstorage
        localStorage.removeItem('authenticatedUser');
        // Trigger state change to remove welcome message from header
        currentComponent.setState({authenticatedUser: null});   
    }


    /**
     * Fetch stories
     */

     async updateStories (){
        await axios.post('http://localhost:5000/api/stories').then();
        
            //console.log(this.getAllStories());
        
     }


     /**
      * Re-render stories
      */

     getAllStories = ()=>{
         console.log('gets stories');
        const currComponent = this;
        axios.get('http://localhost:5000/api/stories')
            .then(function (response) {
              //  console.log(response);
                // handle success
                currComponent.setState({
                    allStories: response.data
                });
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }



}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

