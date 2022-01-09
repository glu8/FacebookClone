import React, { useState } from 'react'
import { Link } from "react-router-dom";
import '../App.css';

function Header(props) {

    return (
        <div className="Header">
            <h1>Facebook Clone</h1>
            <Link to="/">News Feed</Link>

            { props.user !== "" ?
            <div>
            <Link to="/profile">{props.userData.name}</Link>

            <button onClick={() => (props.updateUser(""))}>Log Out</button>
            </div>
            :
            <div></div> }
        </div>
    )

}

export default Header;