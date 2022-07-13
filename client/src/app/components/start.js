import React from 'react';
// import logo from './logo.svg';
import { Link } from 'react-router-dom';

class ToStart extends React.Component {
  render() {
    return (
      <div className="landing-page">
        <h2>Welcome</h2>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <span>
          <p /> <Link to="/formOne">Start onboarding </Link>
          <p />
          {/* <span> or </span>
          <Link to="/search">Continue onboarding</Link>
           */}
        </span>
      </div>
    );
  }
}

export default ToStart;
