import React from 'react'
import '../css/home.css';
import acorn from '../images/acorn_branch.png'

function Home() {
    return (
        <div className="background extrastuff">
            <div class="block">
                <h1 className="top-title white">Let's grow</h1>
            </div>
            <h1 className="top-title">together</h1>
            <p className="third">Join an engaging community of plant parents today.</p>
            <a className="loginbtn" href="/login">start planting</a>
            <img src={acorn} alt="hero" class="hero"/>
        </div>
    )
}

export default Home
