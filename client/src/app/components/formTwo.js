import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import { addUserFormTwo } from '../store/user/users';

// This form is intentionally done differently, solely to display another approach to React components

class Second extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      number: '',
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
      password: sessionStorage.getItem('password'),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearSession = this.clearSession.bind(this);
  }

  componentDidMount() {}

  // every keystroke within the form will update the state
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  notify = (missingVariable) =>
    toast(
      `A required field is missing. You must enter a valid ${missingVariable}.`
    );

  handleSubmit = async (event) => {
    event.preventDefault();

    const { firstName, lastName, number } = this.state;
    if (!firstName || !lastName || !number || number.length !== 10) {
      if (!firstName || firstName.length < 2) this.notify('first name');
      if (!lastName || lastName.length < 2) this.notify('last name');
      if (!number || number.length !== 10) this.notify('phone number');
      return;
    }
    if (firstName.length > 1 && lastName.length > 1 && number.length === 10) {
      // add to the session storage items instead of adding to a database line item that would have been created on the first page, by using this code: await this.props.putUser(email, firstName, lastName, number);

      // set session store items with entered information
      sessionStorage.setItem('firstName', firstName);
      sessionStorage.setItem('lastName', lastName);
      sessionStorage.setItem('number', number);

      // go to formThree page
      window.location.href = `/formThree`;
    } else {
      alert(`Error with handleSumit`);
      return;
    }
  };

  clearSession = () => {
    sessionStorage.clear();
    // go to Home page
    window.location.href = `/`;
  };

  render() {
    return (
      <div id="forms">
        <header>
          <h1>Page 2 of 3</h1>
        </header>
        <div>
          <FormTwo
            {...this.state}
            change={this.handleChange}
            submit={this.handleSubmit}
            clear={this.clearSession}
          />
        </div>
      </div>
    );
  }
}

const FormTwo = (data) => {
  const { submit, change, clear, firstName, lastName, number } = data;
  return (
    <div id="forms">
      <div>
        <form onSubmit={submit}>
          <div id="title">
            <h3>What's your name and number?</h3>
          </div>
          <p />
          <div>
            <label htmlFor="firstName">First name</label>
            <br />
            <input
              name="firstName"
              type="text"
              value={firstName}
              placeholder="Ex: Ned"
              onChange={change}
            />
          </div>
          <p />
          <div>
            <label htmlFor="lastName">Last name</label>
            <br />
            <input
              name="lastName"
              type="text"
              value={lastName}
              placeholder="Ex: Flanders"
              onChange={change}
            />
          </div>
          <p />
          <div>
            <label htmlFor="number">
              Phone number
              <br />
              <div id="instructions">
                Enter your ten digit phone number without any spaces, dashes, or
                other symbols. Example: 5558675309
              </div>
            </label>
            <br />
            <input
              name="number"
              type="text"
              value={number}
              placeholder="Ex: 5558675309"
              onChange={change}
            />
          </div>
          <p />
          <div>
            <button type="submit">Submit</button>
          </div>
          <Toaster />
        </form>
      </div>
      <div id="nav">
        <p />
        {/* clears session store with this exit */}
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            clear();
          }}
        >
          Exit to Home Page
        </Button>
      </div>
    </div>
  );
};

// map dispatch to props

const mapDispatchToProps = (dispatch) => {
  return {
    putUser: (email, firstName, lastName, number) =>
      dispatch(addUserFormTwo(email, firstName, lastName, number)),
  };
};

export default connect(null, mapDispatchToProps)(Second);
