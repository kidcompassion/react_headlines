import React from 'react';

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
	handleSubmit = (e) =>{
			e.preventDefault();
			this.props.context.actions.signIn(this.state);
	}

  render(){
    return(
      <div className="col-6 mx-auto">
				<h1>Sign In</h1>
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
		</div>
    )
  }
}

export default UserSignIn;