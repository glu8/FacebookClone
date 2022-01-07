import React, { useState } from 'react'
import '../App.css';

function NewUser(props) {

    const [user, updateUser] = useState({
        username: '',
        name: '',
        location: '',
    });

    function handleChange(e) {
        updateUser(
            {...user, 
            [e.target.name]: e.target.value
            }
        )
    }

    async function createUser() {

        let userExists = await props.checkExistingUser(user.username);

        if (userExists) {
            alert("Username already in use");
            return false;
        }

            let response = fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        }).then((response) => response.json())
        .catch(error => console.log(error))

        console.log(response)

        props.updateUser(user.username);
        props.updateCreateNewUser(false);

        return true;

    }


    return (
        <div className="NewUser">
            <span> Username <input name="username" value={user.username} onChange={handleChange}/> </span>
            <span> Name <input name="name" value={user.name} onChange={handleChange}/> </span>
            <span> Location <input name="location" value={user.location} onChange={handleChange}/></span>
            <button onClick={() => {
                createUser();
                }}>Submit</button>
            <button onClick={() => (props.updateCreateNewUser(false))}>Cancel</button>

        </div>
    )

}

export default NewUser;