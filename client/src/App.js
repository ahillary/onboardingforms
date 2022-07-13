import React from 'react';
// import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome</h2>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <span>
          <span>What do you want to do? </span>
          <p></p>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start onboarding
          </a>
          {/* <span> or </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Continue onboarding
          </a>
          <span> </span> */}
        </span>
      </header>
    </div>
  );
}

export default App;
