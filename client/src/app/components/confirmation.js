import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
        username,
        password,
        firstName,
        lastName,
        number,
        streetAddress,
        city,
        state,
        zipCode
      );

      // clear session store, reset firstName
      const ClearSession = () => {
        sessionStorage.clear();
        sessionStorage.setItem('firstName', firstName);
      };
      ClearSession();

      // with success redirect to success page
      window.location.href = `/success`;
    } catch {
      alert(`Error with handleSumit`);
      return;
    }
  };

  render() {
    return (
      <div id="forms">
        <header>
          <h1>Everything look good?</h1>
        </header>
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
              <label htmlFor="firstName">First name</label>
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
              <label htmlFor="lastName">Last name</label>
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
              <label htmlFor="streetAddress">Street address</label>
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
              <label htmlFor="zipCode">Zip code</label>
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
          {/* clear session store with this exit */}
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
