import React, { useState, useEffect } from "react";
import {writePost, getPost} from '../database/firebase'
function Feed({user}) {
    const [posts, setPosts] = useState([]);
    const [pulled, setPulled] = useState(false);

    useEffect(() => {
        if (!pulled) {
            getPost(user, (retrivedData) => {
            if (retrivedData) {
                setPosts(retrivedData);
                setPulled(true);
                console.log(retrivedData);
            }
          });
        }
    }, [pulled, user]);

    function newPost(){
		let data = {
			img: "",
			likes: 0,
            user: user.uid,
			comments: []
		};

		writePost(data);
	}

    

    return (
        <div className="background">
            <button onClick={newPost}>Test</button>
        </div>
    )
}

export default Feed
