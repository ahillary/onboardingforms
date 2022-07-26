import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { addUserFormThree } from '../store/user/users';

export class Third extends React.Component {
  constructor() {
    super();
    this.state = {
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      firstName: sessionStorage.getItem('firstName'),
      lastName: sessionStorage.getItem('lastName'),
      number: sessionStorage.getItem('number'),
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // not necessary to see all users while creating an account
    // this.props.seeAllUsers();
  }

  // every keystroke within the form will update the state
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { streetAddress, city, state, zipCode, username } = this.state;
    if (!streetAddress || !city || !state || !zipCode) {
      alert('A required field is missing.');
      return;
    }
    if (streetAddress && city && state && zipCode) {
      this.props.putUser(username, streetAddress, city, state, zipCode);
    } else {
      alert(`Error with handleSumit`);
      return;
    }

    sessionStorage.setItem('streetAddress', streetAddress);
    sessionStorage.setItem('city', city);
    sessionStorage.setItem('state', state);
    sessionStorage.setItem('zipCode', zipCode);

    // with success redirect to confirmation page
  };

  log(props) {
    console.log('Full list of the props ', props);
    console.log('Full list of the state ', this.state);
  }

  render() {
    const { error } = this.state;
    return (
      <div id="forms">
        <header>
          <h1>Page 3 of 3</h1>
        </header>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            this.log(this.props);
          }}
        >
          Props and State
        </Button>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <h3>What's your contact address?</h3>
            </div>
            <p />
            <div>
              <label htmlFor="streetAddress">Street Address</label>
              <br />
              <input
                name="streetAddress"
                type="text"
                value={this.state.streetAddress}
                placeholder="Ex: 123 Road Rd"
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="city">City</label>
              <br />
              <input
                name="city"
                type="text"
                value={this.state.city}
                placeholder="Ex: Big City"
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="state">State </label>
              <br />
              <input
                name="state"
                value={this.state.state}
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <br />
              <input
                name="zipCode"
                type="text"
                value={this.state.zipCode}
                placeholder="Ex: 53099"
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <button type="submit">Finalize</button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
        <div id="forms">
          <p /> <Link to="/confirmation">Finish</Link>
          <p /> <Link to="/formTwo">Go back without submitting</Link>
          <p /> <Link to="/formOne">Start Over</Link>
          <p /> <Link to="/">Exit to Home Page</Link>
        </div>
      </div>
    );
  }
}

// container - mapping state and dispatch to props

const mapStateToProps = (state) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  putUser: (username, streetAddress, city, state, zipCode) =>
    dispatch(addUserFormThree(username, streetAddress, city, state, zipCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Third);
