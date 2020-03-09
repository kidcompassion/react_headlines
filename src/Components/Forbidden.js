import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () =>{
	return(
		<div className="col-10 mx-auto mt-5">
			<h1>This content is protected.</h1>
			<p className= "pt-5 pb-5"><Link to="/signin">Sign in for access.</Link></p>
			<p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
		</div>
	);
}

export default Forbidden;