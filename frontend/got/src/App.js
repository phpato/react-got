import React from 'react';
import List from './Components/List'
import Navbar from './Components/Navbar'
import logo from './logo.svg';
import './App.css';

function App() {
  return (

    <div className="App">
      <Navbar/>
      <br/>
      <div className = "container-fluid">
        <List />
      </div>
      
    </div>
  );
}

export default App;
