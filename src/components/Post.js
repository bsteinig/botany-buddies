import React, { useState, useEffect } from "react";
import '../css/post.css';

function Post({user, post, postName, onPostLike, page}) {

	console.log(post)

	var date = new Date(post.created_at)
	var seconds = Math.floor((new Date() - date) / 1000);
	var interval = seconds / 31536000;
	var blah = "hello";
	if (interval > 1) {
		if(interval == 1){
			blah = Math.floor(interval) + " year ago";
		}
		else{
			blah = Math.floor(interval) + " years ago";
		}
	}
	interval = seconds / 2592000;
	if (seconds < 60*60*24*7*12) {
		if(interval == 1){
			blah = Math.floor(interval) + " month ago";
		}
		else{
			blah = Math.floor(interval) + " months ago";
		}
	}
	interval = seconds / 86400;
	if (seconds < 60*60*24*7) {
		if(interval == 1){
			blah = Math.floor(interval) + " day ago";
		}
		else{
			blah = Math.floor(interval) + " days ago";
		}
	}
	interval = seconds / 3600;
	if (seconds < 60*60*24) {
		if(interval == 1){
			blah = Math.floor(interval) + " hour ago";
		}
		else{
			blah = Math.floor(interval) + " hours ago";
		}
	}
	interval = seconds / 60;
	if (seconds < 60*60) {
		if(interval == 1){
			blah = Math.floor(interval) + " minute ago";
		}
		else{
			blah = Math.floor(interval) + " minutes ago";
		}
	}
	if(seconds < 60){
		if(interval == 1){
			blah = Math.floor(interval) + " second ago";
		}
		else{
			blah = Math.floor(interval) + " seconds ago";
		}
	}

	return (
		<div className={`post ${page == 'pro' ? 'p-small' : ''}`}>
			{page == 'feed' ?
			<div class="name-bar">
				<h1 class="name">{post.username}</h1>
			</div>
			:
			<></>
			}
			<img className={`postImage ${page == 'pro' ? 'pI-small' : ''}`} src={post.img}/>
			<div className="bottom-group">
				<h2 className={`capti ${page == 'pro' ? 'capti-small' : ''}`}>{post.caption}</h2>
				<p>{blah}</p>
				<div className="postlikes">
					<h3 className={`texty ${page == 'pro' ? 't-small' : ''}`}>{post.usersLiked ? post.usersLiked.length : 0}&nbsp;</h3>
					<i style={{cursor: "pointer"}} onClick={() => onPostLike(postName)} className={`${post.usersLiked && post.usersLiked.includes(user.uid) ? 'fas fa-heart pink' : 'far fa-heart pink'}`}></i>
				</div>
			</div>
			
		</div>
	)
}

export default Post
