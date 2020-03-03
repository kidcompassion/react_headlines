import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import BroadcasterStory from './BroadcasterStory';
import { withContext }  from './../Context';

const StoryWithContext = withContext(BroadcasterStory);

export default class BroadcasterIndex extends Component {
	constructor(props){
		super(props);
		this.state = {
				stories:[],
				title:'All Stories',
		}
	}

	componentDidMount(){
		// If user is logged in, load page contents based on the current url
		if(this.props.context.authenticatedUser.emailAddress !== null){
			if(this.props.location.pathname === '/'){
					this.getAllStories();
			} else if(this.props.location.pathname === '/bookmarks'){
					this.getAllBookmarks();
					this.setState({
							title: 'Bookmarks'
					});
			} else{
					this.getPubStories(this.props.location.pathname);
					this.setState({
							title: this.props.location.pathname
					});
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
	 * Executed on route change
	 */
	onRouteChanged = () =>{
		// On /bookmarks, get all bookmarked stories and change the page title
		if(this.props.location.pathname === '/bookmarks'){
			this.getAllBookmarks();
			this.setState({
					title: 'Bookmarks'
			})
			//on root, get all stories from all pubs and change the page title
		}else if(this.props.location.pathname === '/'){
				this.getAllStories();
				this.setState({
						title: 'All Stories'
				})
		}else {
			// else get stories based on the pub specified in the url and use that to set the title
			this.getPubStories(this.props.location.pathname);
			this.setState({
				title: this.props.location.pathname
			})
		}
	}

	/**
	 *  Get stories by publication name
	 */
	getPubStories = (path) => {
		let currPubUrl = 'http://localhost:5000/api/stories' + path;

		const currComponent = this;
		axios.get(currPubUrl)
				.then(function (response) {
					currComponent.setState({
							stories: response.data
					});
				})
				.catch(function (error) {
						// handle error
						console.log(error);
				});		
	}

	/**
	 * Retrieve all bookmarked stories for current user
	 */
	getAllBookmarks = () =>{  
		const currComponent = this;
		
			// Get all stories from user's bookmarks endpoint
			axios.get(`http://localhost:5000/api/${this.props.context.authenticatedUser.id}/bookmarks`)
					.then(function (response) {
							const stories = response.data;
							// Filter to add the 'isBookmarked' state on the fly
							stories.filter(story=>{
								story.isBookmarked = true;
								return stories;
							});
							
							currComponent.setState({
									stories: stories
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
	getAllStories = ()=>{

		//Set up request for stories
		const requestStories = axios.get('http://localhost:5000/api/stories');
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

			// Loop through bookmark IDS
			bookmarkIds.forEach((el)=>{
				// Find the bookmarked story in the main feed
				stories.find((story) => {
					// If the bookmarked story is there, set isBookmarked to true so the button gets correct styling
					if(story.id === el){
							story['isBookmarked'] = true;
					}

					return stories;
				});			
			});
			// Update state to include isBookmarked values
				this.setState({
						stories: stories,					
				});
		})).catch(function (error) {
				// handle error
				console.log(error);
		})
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
						return(  <StoryWithContext bookmarked={story.isBookmarked} key={story.id} storyDetails={story} />)
					})}		
			</div>
		);
  }
}