import React, {useState, useEffect} from 'react'
import { storage, newImage, getImages, writePost, getUserPosts, updatePost } from '../database/firebase'
import Post from '../components/Post';

function Profile({user}) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [create, setCreate] = useState(false)
    const [caption, setCaption] = useState("");

    const [posts, setPosts] = useState({});
    const [pulled, setPulled] = useState(false);

    var dateObj = new Date(user.metadata.creationTime);
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();

    useEffect(() => {
        if (!pulled) {
            getUserPosts(user, (retrivedData) => {
            if (retrivedData) {
                setPosts(retrivedData);
                setPulled(true);
            }
          });
        }
    }, [pulled, user]);

    const handleImageAsFile = (e) => {
        if(e.target.files[0]){
        setFile(e.target.files[0])
        }
    }

    function newPost(url){
        var date = new Date();
		let data = {
			img: url,
            caption: caption,
			likes: 0,
            user: user.uid,
            created_at: date.toISOString(),
            usersLiked: [user.uid],
            username: user.displayName
		};

		writePost(data);
	}
    
    const handleImageSubmit = (callback) => {
        if(file != null){
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
            console.log(error)
            },
            () => {
            storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then(url => {
                    console.log(url)
                    newImage(user, url);
                    setFile(null);
                    callback(url);
                })
            }
        )
        }
    };

    const handleFormSubmit = () => {
        handleImageSubmit(url => {
            newPost(url);
        })
    }

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
        <div className="background">
            <div className="profile-bar">
                <div className="propic-pro">
                    <img className="proimg" src={user.photoURL} alt="propic"/>
                </div>
                <div className="text-box">
                    <h1 className="name">{user.displayName}</h1>
                    <p className="sub-head">joined: <span className="date">{monthNames[month]}&nbsp;{year}</span></p>
                </div>
            </div>
            {create ?
                <div class="post-creation">
                    <h1 class="title-bar">Introduce a new plant!</h1>
                    <div className='file-in'>  
                        <input type='file' className='input-file'
                        onChange={handleImageAsFile}/>
                    </div>
                    <div class="text-in">
                        <input type="text" class="input-text"
                        value={caption} onChange={(e) => setCaption(e.target.value)}/>
                    </div>
                    <button className="submit-btn" onClick={handleFormSubmit}>
                    Import
                    </button>
                </div>
            :
                <div className='spacer-new'>
                    <button onClick={() => {setCreate(!create)}} className="btn btn-plus"><i className="fas fa-plus-circle"></i></button>
                </div>
            }

            {
                Object.keys(posts).map(post => 
                    <Post user={user} key={post} post={posts[post]} postName={post} onPostLike={onLike} page={'pro'}/>
                )
            }
            
            
        </div>
    )
}

export default Profile
