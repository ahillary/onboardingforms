// let AddAddress
//  <id="formThree" onSubmit={handleSubmit}>
// export default AddAddress

// address: street, city, state, zip

import React from 'react';
import { Link } from 'react-router-dom';

export class Third extends React.Component {
  render() {
    return (
      <div id="forms">
        <h1>formThree</h1>
        <p /> <Link to="/confirmation">Finish </Link>
        <p /> <Link to="/formTwo">Go Back</Link>
        <p /> <Link to="/formOne">Start Over</Link>
        <p /> <Link to="/">Home</Link>
      </div>
    );
  }
}

export default Third;
