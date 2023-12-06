import React, { useState, useEffect } from "react";
import logo from "./Comps/Logo.png";
import "./App.css";

function setTarget() {
  return Math.floor(Math.random() * 90) + 7;
}

function App() {
  const [time, setTime] = useState(0);
  const [target, setTargetValue] = useState(setTarget());
  const [message, setMessage] = useState("Lets Start");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
    if (milliseconds !== 0) {
      if (target === milliseconds) {
        setMessage("Won👏👏😎");
        setNewTarget();
      } else {
        setMessage("Try Again😣😣");
      }
    }
  };

  const reset = () => {
    setTime(0);
    setMessage("Lets Start");
  };

  const setNewTarget = () => {
    setTargetValue(setTarget());
  };

  return (
    <div className="App">
      <div className="title">
        <img id="Logo" src={logo} />
      </div>
      <div className="target">Target: 0:{target}</div>
      <div className="game">
        <div className="timer">
          {" "}
          <p className="stopwatch-time">
            {seconds.toString().padStart(2)}:
            {milliseconds.toString().padStart(2, "0")}
          </p>
        </div>

        <div className="message">{message}</div>

        <div className="pausebtn">
          {" "}
          <button className="stopwatch-button" onClick={startAndStop}>
            {isRunning ? (
              <i class="fa-solid fa-pause"></i>
            ) : (
              <i class="fa-solid fa-play"></i>
            )}
          </button>
          <button className="stopwatch-button" onClick={reset}>
            <i class="fa-solid fa-arrow-rotate-right"></i>
          </button>
          <br />
          <button className="new" onClick={setNewTarget}>
            New Target
          </button>
          <br />
          <div id="autoDiv">
            <label className="autoReset">Auto Reset:</label>
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
