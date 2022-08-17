import React from 'react';
import { Link } from 'react-router-dom';

// clear sessionStorage upon clicking link to go to Home Page

class Success extends React.Component {
  render() {
    const name = sessionStorage.getItem('firstName');
    return (
      <div id="success">
        <h1>You're all set! Welcome to this membership {name}.</h1>
        <h2>Thank you</h2>
        <p />
        <Link onClick={() => sessionStorage.clear()} to="/">
          Home Page
        </Link>
      </div>
    );
  }
}

export default Success;
