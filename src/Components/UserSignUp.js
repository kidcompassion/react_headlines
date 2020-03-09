import React from 'react';
import axios from 'axios';

class UserSignUp extends React.Component{  

  constructor(props){
    super(props);

    this.state = {
      emailAddress:"",
      password:"",
  }

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);

  }
  handleChange = (event) =>{
    const name = event.target.name;
		const value = event.target.value;
		this.setState({
				[name]: value 
    });
   
  }

  handleSignUp = (event) =>{
    event.preventDefault();
   // console.log(this.state);
    const signUp = axios.post(`http://localhost:5000/api/create-user`, this.state);

    signUp.then((errors)=>{
      this.props.history.push('/signin');
    })
    
    
    
    
  }
  
  render(){
    return(
      <div className="col-4 mx-auto">
        <h1 className="pt-5 pb-3">Sign Up for Access</h1>
        <form onSubmit={this.handleSignUp}>
					<div className="form-group">
							<label htmlFor="emailAddress">Email address</label>
							<input type="email" 
                      name="emailAddress"
                      className="form-control" 
                      id="emailAddress" 
                      aria-describedby="email"
                      onChange={this.handleChange} />
							
					</div>
					<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password"
                      name="password"
                      className="form-control" 
                      id="password"
                      aria-describedby="password"
                      onChange={this.handleChange} />
					</div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default UserSignUp;