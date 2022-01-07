import React, { useState } from 'react'
import '../App.css';

function Header(props) {

    return (
        <div className="Header">
            <h1>Facebook Clone</h1>
            
            { props.user !== "" ?
            <div>
            <p>{props.userData.name}</p>
            <button onClick={() => (props.updateUser(""))}>Log Out</button>
            </div>
            :
            <div></div> }
        </div>
    )

}

export default Header;