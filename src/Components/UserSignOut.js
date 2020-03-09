const UserSignOut = (props) => {
	// Run the signout function, which clears localstorage and context state    
	props.context.actions.signOut();
	// redirect user to the signin
	props.history.push("/signin");
	//Return nothing, since we're redirecting
	return(null)
}

export default UserSignOut;