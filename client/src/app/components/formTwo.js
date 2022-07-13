// let AddNameNumber
//  <id="formTwo" onSubmit={handleSubmit}>

// export default AddNameNumber

import React from 'react';
import { Link } from 'react-router-dom';

export class Second extends React.Component {
  render() {
    return (
      <div id="formTwo">
        <h1>formTwo</h1>
        <p /> <Link to="/formThree">Continue</Link>
        <p /> <Link to="/formOne">Go Back</Link>
      </div>
    );
  }
}

export default Second;
