import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import helloWorldString from './hello-world-functions';

class App extends Component {
  render(){
    let var2 = helloWorldString();
    // alert(var2);
    console.log(var2);
    return (
      <div className="App">
      <p>Omg</p>
      <button className="square" onClick={() => alert('click')}>
      Square
    </button>
      </div>
    );
  }
  render2() {
    return (
      <div className="App2">
        <script>alert(11)</script>
        <header className="App-header">
        <script>alert(11)</script>
          <p>we don't need no stinkin logo</p>
          <p>
            modified5a!!!
          </p>
          
        </header>
      </div>
    );
  }
}

export default App;
