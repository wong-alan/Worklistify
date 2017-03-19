import React, { Component } from 'react';
import logo from './assets/images/UBClogo.png'
import './App.css';
import WorklistBuilder from './WorklistBuilder.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="title">UBC Worklist Builder</h1>
        </div>
        <div className="content">
          <p className="App-intro">
            Tired of building worklists manually like a pleb?
            Let us do the work for you.
          </p>
          <WorklistBuilder>
          </WorklistBuilder>
          <p>
            never-lucky 2017
          </p>
        </div>
      </div>
    );
  }
}

export default App;
