import React from 'react';
import {Link} from 'react-router-dom';
class UserSignIn extends React.Component{
	constructor(props){
		super(props);
		this.state = {
				authenticatedUser:{},
				emailAddress: '',
				password:'',
				errors: null
		}
	}


	componentDidMount(){
		
	}
	
	/**
	 * Grab form input and put it into state
	 */
	handleChange = (event) =>{
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
				[name]: value 
		});

		
	}
		
	/**
	 * On submit, sign in via Context hoc
	 */
	handleSubmit = async e =>{
			e.preventDefault();
			
				await this.props.context.actions.signIn(this.state);
				this.props.history.push('/stories/1');
				
			
			

	}

  render(){
    return(
      <div className="col-12 col-md-4 mx-auto pt-5">
				<h1 className ="pb-3">Sign In</h1>
				{this.props.context.successfulSignUp !== false ? (
				<p className="alert alert-success" role="alert">You've successfully signed up! Now sign in below.</p>
				): ('')}
				<form onSubmit={this.handleSubmit}>
						<div className="form-group">
								<label htmlFor="exampleInputEmail1">Email address</label>
								<input type="email" 
												name="emailAddress"
												onChange = {this.handleChange}
												className="form-control" 
												id="exampleInputEmail1" 
												aria-describedby="emailHelp" />
								
						</div>
						<div className="form-group">
								<label htmlFor="password">Password</label>
								<input type="password" 
										name="password"
												onChange = {this.handleChange}
												className="form-control" 
												id="password" 
												aria-describedby="passwordHelp" />
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
				</form>
				<p className="pt-3">Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
		</div>
    )
  }
}

export default UserSignIn;