import React from 'react';

const Forbidden = () =>{
	return(
		<div className="col-10 mx-auto mt-5">
			<h1>This content is protected.</h1>
			<p><a href="/signin">Sign in for access.</a></p>
		</div>
	);
}

export default Forbidden;