import React, { Component } from 'react';
import {RTC} from './rtc/Rtc';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <video controls autoplay playsinline id="share-video" width="400" height="300"></video>
          <video controls autoplay playsinline id="copy-video" width="400" height="300"></video>
          <canvas className="video-img" width="400" height="300" ></canvas>
          <button type="button" onClick={RTC.shareScreen}>Share Screen</button>
        </header>
      </div>
    );
  }
}

export default App;
