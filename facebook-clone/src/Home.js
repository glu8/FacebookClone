import React, { useState, useEffect } from 'react';
import { Link, Outlet} from "react-router-dom";
import './App.css';
import Header from './components/Header.js';

function Home(props) {


  return (
    <div className="App">

    <Header user={props.user} userData={props.userData} updateUser={props.updateUser}/>

    <Outlet />


    </div>
  );
}

export default Home;
