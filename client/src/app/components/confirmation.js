import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { createUser } from '../store/user/users';

class Confirmation extends React.Component {
  constructor() {
    super();
    this.state = {
      email: sessionStorage.getItem('email'),
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password'),
      firstName: sessionStorage.getItem('firstName'),
      lastName: sessionStorage.getItem('lastName'),
      number: sessionStorage.getItem('number'),
      streetAddress: sessionStorage.getItem('streetAddress'),
      city: sessionStorage.getItem('city'),
      state: sessionStorage.getItem('state'),
      zipCode: sessionStorage.getItem('zipCode'),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  // every keystroke within the form will update the state
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      email,
      username,
      password,
      firstName,
      lastName,
      number,
      streetAddress,
      city,
      state,
      zipCode,
    } = this.state;

    if (
      !email ||
      !password ||
      !username ||
      !firstName ||
      !lastName ||
      !number ||
      !streetAddress ||
      !city ||
      !state ||
      !zipCode
    ) {
      alert('A required field is missing.');
      return;
    }
    try {
      this.props.addAUser(
        email,
        streetAddress,
        city,
        state,
        zipCode,
        firstName,
        lastName,
        number,
        username,
        password
      );

      // with success redirect to confirmation page
      // window.location.href = `/success`;
    } catch {
      alert(`Error with handleSumit`);
      return;
    }
  };

  log(props) {
    console.log('Full list of the props ', props);
    console.log('Full list of the state ', this.state);
  }

  render() {
    console.log('see me: ', this.props);
    return (
      <div id="forms">
        <header>
          <h1>Everything look good?</h1>
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
              <label htmlFor="email">Email </label>
              <br />
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="username">Username </label>
              <br />
              <input
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="firstName">First Name</label>
              <br />
              <input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="lastName">Last Name</label>
              <br />
              <input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="number">Phone number (just the ten digits)</label>
              <br />
              <input
                name="number"
                type="text"
                value={this.state.number}
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="streetAddress">Street Address</label>
              <br />
              <input
                name="streetAddress"
                type="text"
                value={this.state.streetAddress}
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
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="state">State</label>
              <br />
              <input
                name="state"
                type="text"
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
          </form>
        </div>
        <div id="forms">
          <p /> <Link to="/">Exit to Home Page</Link>
        </div>
      </div>
    );
  }
}
// map dispatch to props

const mapDispatchToProps = (dispatch) => {
  return {
    addAUser: (
      email,
      username,
      password,
      firstName,
      lastName,
      number,
      streetAddress,
      city,
      state,
      zipCode
    ) =>
      dispatch(
        createUser(
          email,
          username,
          password,
          firstName,
          lastName,
          number,
          streetAddress,
          city,
          state,
          zipCode
        )
      ),
  };
};

export default connect(null, mapDispatchToProps)(Confirmation);
