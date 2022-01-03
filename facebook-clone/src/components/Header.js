import React, { useState } from 'react'
import '../App.css';

function Header(props) {

    return (
        <div className="Header">
            <h1>Facebook Clone</h1>

            <div>
            <p>{props.user}</p>
            <button onClick={() => (props.updateUser(""))}>Log Out</button>
            </div>
        </div>
    )

}

export default Header;