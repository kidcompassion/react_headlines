import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

export default class BroadcasterStory extends Component {
	/**
	 * Post to bookmark endpoint when btn is clicked
	 * */

  	handleBookmark = (e) =>{
		const selectedStoryId = this.props.storyDetails.id;
		const currUserId = this.props.context.authenticatedUser.id;
		
		//if is all stories, get all stories
		//if all bookmarks, get all bookmarks
		//if all pubs, get all pubs
		axios.post(`${config.apiBaseUrl}/user/${currUserId}/create-bookmark/`, {storyId:selectedStoryId}).then(()=>{
			if(this.props.currPage.path === '/stories/:id'){
				this.props.triggerStories.getAllStories(this.props.currPage.params.id);
			} else if(this.props.currPage.path === "/bookmarks/:id"){
				//console.log('mytest');
				this.props.triggerStories.getAllBookmarks(this.props.currPage.params.id);
			} else{
				this.props.triggerStories.getPubStories(this.props.routerInfo.location.pathname);
			}
		});
	}

  render() {
    return (
		<article className="col-10 col-md-8 mx-auto text-left pt-3 pb-3 mb-3 component--story">
			<div className="row card-body">
				<div className="col-12 col-lg-3"> <img src={this.props.storyDetails.imgUrl} alt="this.props.storyDetails.title"/></div>
					<div className="col-12 col-lg-9">
						<a target="_blank" rel="noopener noreferrer" href={this.props.storyDetails.Publication.url} className="badge--publication badge badge-info">{this.props.storyDetails.Publication.name}</a>
						<h2>{this.props.storyDetails.title}</h2>
						<p className="text--byline">Byline: {this.props.storyDetails.author} | {this.props.storyDetails.publicationDate}</p>
						<p className="story--expert">{this.props.storyDetails.excerpt}</p>
						<a target="_blank" rel="noopener noreferrer" href={this.props.storyDetails.url} className="col-12 btn--basic btn--read btn mb-3">Read the article</a>
						<button onClick={this.handleBookmark} className={"btn--basic btn--bookmark btn col-12 "+ (this.props.bookmarked ? 'bookmarked': 'not-bookmarked')}><i className="fa fa-bookmark-o mr-2"></i>{ this.props.bookmarked ? 'Bookmarked' : 'Bookmark Story'}</button>
					</div>
			</div>
		</article>
    );
  }
}