import React, { useState, useEffect } from "react";
import {writePost, getUserPosts, updatePost, getAllPosts} from '../database/firebase'
import Post from '../components/Post';
import '../css/style.css';

function Feed({user}) {
    const [posts, setPosts] = useState({});
    const [pulled, setPulled] = useState(false);

    useEffect(() => {
        if (!pulled) {
            getAllPosts((retrivedData) => {
            if (retrivedData) {
                var allPosts = {};
                Object.keys(retrivedData).forEach(user => {
                    Object.keys(retrivedData[user]).forEach(postName => {
                        allPosts[postName] = retrivedData[user][postName];
                    })
                })
                setPosts(allPosts);
                setPulled(true);
            }
          });
        }
    }, [pulled, user]);

    const onLike = (postName) => {
        const newPost = {...posts[postName]}
        const newPosts = {...posts};
        if(newPost.usersLiked && newPost.usersLiked.includes(user.uid)){
            const index = newPost.usersLiked.indexOf(user.uid);
            if (index > -1) {
                newPost.usersLiked.splice(index, 1);
            }
        }else{
            if(!newPost.usersLiked){
                newPost.usersLiked = [];
            }
            newPost.usersLiked.push(user.uid)
        }

        newPosts[postName] = newPost;

        updatePost(postName, newPost);

        setPosts(newPosts);
    }

    return (
        <div className="insta background extramargin">
            {
                Object.keys(posts).reverse().map(post => 
                    <Post user={user} key={post} post={posts[post]} postName={post} onPostLike={onLike} page={'feed'}/>
                )
            }
        </div>
    )
}

export default Feed
