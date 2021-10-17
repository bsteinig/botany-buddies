import React from 'react'
import '../css/nav.css';

const Navbar = ({user, setUser}) => {
    console.log("Navbar user:", user)
    var imageUrl = "";
    if(user){
        imageUrl = user.photoUrl;
    }
    // const user = useContext(UserContext)
    return(
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom ">
            <div className="container-fluid">
                <a className="navbar-brand title-bar" href="/">botany<span className='gray-title'>buddies</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="d-flex navbar-nav mr-auto justification">
                    <li className="p-2 nav-item active-custom">
                        <a className="nav-link" aria-current="page" href="/">Home</a>
                    </li>
                    {user ?
                        <li className="p-2 nav-item active-custom">
                            <a className="nav-link" href="/profile">Profile</a>
                        </li>
                    :
                        <div></div>
                    }
                    {user ?
                        <li className="p-2 nav-item active-custom">
                            <a className="nav-link" href="/feed">Feed</a>
                        </li>
                    :
                        <div></div>
                    }
                </ul>
                <ul className="d-flex nav navbar-nav ml-auto">
                        {user ?
                            <li className="ms-auto nav-item nav-custom-flex">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="navbar-text">Welcome Back, {user.displayName}</span>
                                        <img className="propic" src={user.photoURL}/>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="/logout">Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        : 
                            <div></div>}
                        {user ? 
                            <></>
                        :
                            <li className="ms-auto p-2 nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li>
                        }
                </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;