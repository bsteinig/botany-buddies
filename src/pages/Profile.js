import React, {useState, useEffect} from 'react'
import { storage, newImage, getImages } from '../database/firebase'

function Profile({user}) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    const [images, setImages] = useState([]);
    const [pulled, setPulled] = useState(false); 
    const [file, setFile] = useState(null);

    var dateObj = new Date(user.metadata.creationTime);
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();

    useEffect(() => {
        if (!pulled) {
            getImages(user, (retrivedData) => {
            if (retrivedData) {
                setImages(retrivedData);
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

    console.log('file: ', file)
    
    const handleImageSubmit = () => {
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
                setFile(null)
                })
            }
        )
        }
    };

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
            Profile
            <div className='file-in'>  
                <input type='file' className='input-file'
                  onChange={handleImageAsFile}/>
            </div>
           
            <button className="submit-btn" onClick={handleImageSubmit}>
            Import
            </button>
        </div>
    )
}

export default Profile
