import React from 'react';
import { Link } from 'react-router-dom';

// add the first name after Thank you
// clear sessionStorage when click link

export class Success extends React.Component {
  render() {
    return (
      <div id="success">
        <h1>You're all set!</h1>
        <h2>Thank you</h2>
        <p /> <Link to="/">Home Page</Link>
      </div>
    );
  }
}

export default Success;
