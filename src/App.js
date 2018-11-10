import React, { Component } from 'react';
import {RTC} from './rtc/Rtc';
import './App.css';

class App extends Component {


  shareScreen(){
    alert("it will Share");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <video controls autoplay playsinline></video>
          <button type="button" onClick={RTC.shareScreen()}>Share Screen</button>
        </header>
      </div>
    );
  }
}

export default App;
