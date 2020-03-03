import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {  
  return(
		<nav className="navbar navbar-dark component--navbar">
			<div className="container-fluid">
			<ul className="row"> 
					<li><Link to="/" className="navbar-brand">News App</Link></li>
					<li><Link to="/edmonton-journal">Edmonton Journal</Link></li>
					<li><Link to="/edmonton-sun">Edmonton Sun</Link></li>
					<li><Link to="/ctv-edmonton">CTV Edmonton</Link></li>
					<li><Link to="/cbc-edmonton">CBC Edmonton</Link></li>
			</ul>
			{ props.context.authenticatedUser !== null ? ( 
				<ul className="user--dropdown">
						<li>{props.context.authenticatedUser.emailAddress} <i className="fa fa-chevron-down"></i> 
								<ul>
										<li><Link to="/bookmarks">Bookmarks</Link></li>
										<li><Link to="/signout">Sign Out</Link></li>
								</ul>
						</li> 		
				</ul>
			) : (
					<Link to="/signin">Sign In</Link>
			)}
			</div>
		</nav>
  )
}

export default Header;