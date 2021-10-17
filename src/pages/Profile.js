import React, {useState, useEffect} from 'react'
import { storage, newImage, getImages, writePost, getUserPosts, updatePost } from '../database/firebase'
import Loader from 'react-spinner-loader'
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
    const [spinner, setSpinner] = useState(false);

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
                    setSpinner(false)
                    callback(url);
                })
            }
        )
        }
    };

    const handleFormSubmit = () => {
        setSpinner(true);
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
                    <p className="sub-head">joined <span className="date">{monthNames[month]}&nbsp;{year}</span></p>
                </div>
            </div>
            {create ?
                <div className="post-creation">
                    {  spinner ?
                        <div className="spinner">
                            <Loader
                                type="Rings"
                                color="#0f9bd1"
                                height={150}
                                width={150}
                                visible={true}
                                style={{display:'flex', justifyContent:'center', marginTop:'1rem' }}
                            />  
                        </div>  
                    :
                    <div className="flex">
                        <button onClick={() => {setCreate(!create)}} className="btn btn-x"><i className="fas fa-times-circle"></i></button>
                        <h1 className="title-bar">Introduce a new plant!</h1>
                        <div className='file-in'>  
                            image:
                            <input type='file' className='input-file'
                            onChange={handleImageAsFile}/>
                        </div>
                        <div className="text-in">
                            caption: 
                            <input type="text" className="input-text"
                            value={caption} onChange={(e) => setCaption(e.target.value)}/>
                        </div>
                        <button className="submit-btn" onClick={handleFormSubmit}>
                        Import
                        </button>
                    </div>
                    }
                </div>
            :
                <div className='spacer-new'>
                    <button onClick={() => {setCreate(!create)}} className="btn btn-plus"><i className="fas fa-plus-circle"></i></button>
                </div>
            }
            <div className="grid">
            {
                Object.keys(posts).reverse().map(post => 
                    <Post user={user} key={post} post={posts[post]} postName={post} onPostLike={onLike} page={'pro'}/>
                )
            }
            </div>
            
        </div>
    )
}

export default Profile
