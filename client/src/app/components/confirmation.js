import React from 'react';
import { Link } from 'react-router-dom';

export class Confirmation extends React.Component {
  render() {
    return (
      <div id="confirmation">
        <h1>You're all set!</h1>
        <h2>Thank you</h2>
        <p /> <Link to="/">Home Page</Link>
      </div>
    );
  }
}

export default Confirmation;
