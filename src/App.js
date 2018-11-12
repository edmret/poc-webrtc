import React, { Component } from 'react';
import {RTC} from './rtc/Rtc';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <video controls autoPlay playsInline id="share-video" width="400" height="218"></video>
          <canvas className="video-img" width="400" height="218" ></canvas>
          <video controls autoPlay playsInline id="copy-video" width="400" height="218"></video>
          <button type="button" onClick={RTC.shareScreen}>Share Screen</button>
        </header>
      </div>
    );
  }
}

export default App;
