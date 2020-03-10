import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {  
  return(
		<nav className="navbar navbar-dark component--navbar">
			<div className="container-fluid">
			<ul className="row"> 
					<li className="col-12 col-lg-2"><Link to="/stories/1" className="navbar-brand">News App</Link></li>
					<li className="col-12 col-lg-2"><Link to="/edmonton-journal/1">Edmonton Journal</Link></li>
					<li className="col-12 col-lg-2"><Link to="/edmonton-sun/1">Edmonton Sun</Link></li>
					<li className="col-12 col-lg-2"><Link to="/ctv-edmonton/1">CTV Edmonton</Link></li>
					<li className="col-12 col-lg-2"><Link to="/cbc-edmonton/1">CBC Edmonton</Link></li>
			</ul>
			{ props.context.authenticatedUser !== null ? ( 
				<ul className="user--dropdown">
						<li>{props.context.authenticatedUser.emailAddress} <i className="fa fa-chevron-down"></i> 
								<ul>
										<li><Link to="/bookmarks/1">Bookmarks</Link></li>
										<li><Link to="/signout">Sign Out</Link></li>
								</ul>
						</li> 		
				</ul>
			) : (
					<div>
					<Link to="/signin">Sign In</Link> 
					&nbsp;|&nbsp; 
					<Link to="/signup">Sign Up</Link>
					</div>
			)}
			</div>
		</nav>
  )
}

export default Header;