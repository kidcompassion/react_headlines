import React, { Component } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import BroadcasterStory from './BroadcasterStory';
import { withContext }  from './../Context';

const StoryWithContext = withContext(BroadcasterStory);

class BroadcasterIndex extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			stories:[],
			totalPages:null,
			title:null,
			actions:{
				getPubStories: this.getPubStories,
				getAllStories: this.getAllStories,
				getAllBookmarks: this.getAllBookmarks
			},
		}
	}

	componentDidMount(){
		// If user is logged in, load page contents based on the current url
		if(this.props.context.authenticatedUser.emailAddress !== null){
			if(this.props.match.path === '/stories/:id'){
				console.log('mystories');
				//console.log(this.props.match);
				this.getAllStories(this.props.match.params.id);
				this.setState({'title': 'All Stories'});
			} else if(this.props.match.path === '/bookmarks/:id'){
				console.log('mybooks');
				this.getAllBookmarks(this.props.match.params.id);
				this.setState({'title': 'Bookmarks'});
			} else{
				this.getPubStories(this.props.location.pathname, this.props.match.params.id);
				this.setState({title: this.formatTitle(this.props.location.pathname)});
			}
		// else redirect to sign up/sign in page
		} else {
				return(<Redirect to="/signup" />)
		}
	}

	componentDidUpdate(prevProps) {
		// Listen for change of url
		if (this.props.location !== prevProps.location) {
			this.onRouteChanged();
		}
	}



	/**
	 * Format title
	 */

	formatTitle = (path) =>{
		let parentPath = path.substring(0, path.lastIndexOf("/"));
	   	parentPath = parentPath.replace('-',' ');
		parentPath = parentPath.substring(1);
		return parentPath;
	}

	/**
	 * Calculate total pages
	 */
	 calculatePages = (allStories) =>{
		return parseInt(Math.ceil(allStories));
	 }

	 pubLookup = () =>{
		 const allPubs = axios.get(`http://localhost:5000/api/publications`);
	 }

	/**
	 * Executed on route change
	 */
	onRouteChanged = () =>{
		console.log('change');
		
		// On /bookmarks, get all bookmarked stories and change the page title
		if(this.props.match.path ==="/bookmarks/:id"){
			console.log('bookmarks');
			this.getAllBookmarks(this.props.match.params.id);
			this.setState({title: 'Bookmarks'});
			//on root, get all stories from all pubs and change the page title
		}else if(this.props.match.path ==="/stories/:id"){
			console.log('stories');
				this.getAllStories(this.props.match.params.id);
				this.setState({title: 'All Stories'});
		}else {
			// else get stories based on the pub specified in the url and use that to set the title
			this.getPubStories(this.props.location.pathname);
			this.setState({title: this.formatTitle(this.props.location.pathname)});
		}
	}

	/**
	 *  Get stories by publication name
	 */

	getPubStories = (path, currPage)=>{

		//Set up request for stories
		const requestStories = axios.get(`http://localhost:5000/api/stories/by-publication${path}`);
		
		//Set up request for current user's bookmarked stories
		const requestBookmarks =  axios.get(`http://localhost:5000/api/${this.props.context.authenticatedUser.id}/bookmarks`);

		// .all allows for calling multiple endpoints
		axios.all([requestStories, requestBookmarks]).then(axios.spread((...responses)=>{
			
			// Get all bookmarked story objects
			let bookmarks = responses[1].data;
			// Set up array to hold just the ids	
			let bookmarkIds = [];
			// Push bookmarked IDs into array
			bookmarks.forEach((el, index)=>{
				
					bookmarkIds.push(el.id);
			});
				
			// Get all story objects
			let stories = responses[0].data;
			//console.log(stories);
			// Loop through bookmark IDS
			bookmarkIds.forEach((el)=>{
			//	console.log(el);
				// Find the bookmarked story in the main feed
				stories.rows.find((story) => {
					//console.log(story.id, el);
					
					// If the bookmarked story is there, set isBookmarked to true so the button gets correct styling
					if(story.id === el){
						
							story['isBookmarked'] = true;
							
					}
					//console.log(story);
					
				});			
			});
			// Update state to include isBookmarked values
				this.setState({
						stories: stories.rows,	
						totalPages: this.calculatePages(responses[0].data.count/10)				
				});
		})).catch(function (error) {
				// handle error
				console.log(error);
		})
	}



	/**
	 * Retrieve all bookmarked stories for current user
	 */
	getAllBookmarks = (currPage) =>{  
		//console.log('is this working');
		//console.log(currPage);
		const currComponent = this;
		console.log('fires');
			// Get all stories from user's bookmarks endpoint
			axios.get(`http://localhost:5000/api/${this.props.context.authenticatedUser.id}/bookmarks/${currPage}`)
				.then(function (response) {
					
					const stories = response.data.rows;
					console.log(stories);
					// Filter to add the 'isBookmarked' state on the fly
					stories.filter(story=>{
						story.isBookmarked = true;
						return stories;
					});
					
						currComponent.setState({
							stories: stories,
							totalPages: currComponent.calculatePages(response.data.count/10)
						});
				})
				.catch(function (error) {
						// handle error
						console.log(error);
				})
				.then(function () {
						// always executed
					});
	}




	/** 
	 * Generates main feed of all stories from all pubs
	 */
	getAllStories = (currPage)=>{
		
		//Set up request for stories
		const requestStories = axios.get(`http://localhost:5000/api/stories/${currPage}`);
		//Set up request for current user's bookmarked stories
		const requestBookmarks =  axios.get(`http://localhost:5000/api/${this.props.context.authenticatedUser.id}/bookmarks`);

		// .all allows for calling multiple endpoints
		axios.all([requestStories, requestBookmarks]).then(axios.spread((...responses)=>{
			console.log(responses);
			// Get all bookmarked story objects
			let bookmarks = responses[1].data;
			// Set up array to hold just the ids	
			let bookmarkIds = [];
			// Push bookmarked IDs into array
			bookmarks.forEach((el, index)=>{
				bookmarkIds.push(el.id);
			});
				
			// Get all story objects
			let stories = responses[0].data.allStories;
			
			// Loop through bookmark IDS
			bookmarkIds.forEach((el)=>{

				// Find the bookmarked story in the main feed
				stories.find((story) => {
					
					// If the bookmarked story is there, set isBookmarked to true so the button gets correct styling
					if(story.id === el){
						story['isBookmarked'] = true;
					}

				});			
			});
			// Update state to include isBookmarked values
				this.setState({
					stories: stories,	
					totalPages: this.calculatePages(responses[0].data.totalStories/10)
				});
		})).catch(function (error) {
				// handle error
				console.log(error);
		})
	}

	/**
	 * Crate pagination
	 */

	createPagination = (totalPages) =>{
		
		let pagination = [];
		for(var i=0; i < totalPages; i++){

			
			pagination.push(<li className={parseInt(this.props.match.params.id) === i ? 'currentPage':''} key={i}><Link to={`${i}`}>{`${i}`}</Link> </li>)
		}
		return pagination;
	}

	/**
	 * Trigger scrape of latest stories from all XML feeds
	 */

	handleSubmit=(event)=>{
		event.preventDefault();
		// Trigger the update func from context hoc
		this.props.context.actions.updateStories();
	}

  render() { 
	//  console.log(this.state);
    return (
            
			<div className="row component--index">	
				<div className="col-6 mt-5 mb-5">
					<h1>{this.state.title}</h1>
				</div>
				<div className="col-6">
					<form onSubmit={this.handleSubmit} className="mt-5 mb-5">
						<button className="btn btn-success" type="submit"><i className="fa fa-refresh fa-1x"></i> Refresh stories </button>
					</form>
				</div>					
					{this.state.stories.map((story, index)=>{
						return(  <StoryWithContext currPage={this.props.match} routerInfo={this.props.history} triggerStories={this.state.actions} bookmarked={story.isBookmarked} key={story.id} storyDetails={story} />)
					})}		
					
					
				<div className="col-10 pt-5 pb-5 text-center mx-auto">
					<ul className="component--pagination">
							{this.createPagination(this.state.totalPages)}
					</ul>
				</div>
				
				
			</div>
			
		);
  }
}

export default withRouter(BroadcasterIndex);