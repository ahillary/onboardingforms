import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import toast from 'react-hot-toast';
import FormThree from './formThree';
import { addUserFormThree } from '../../store/';

class Third extends React.Component {
  constructor() {
    super();
    this.state = {
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      firstName: sessionStorage.getItem('firstName'),
      lastName: sessionStorage.getItem('lastName'),
      phone: sessionStorage.getItem('phone'),
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
      password: sessionStorage.getItem('password'),
    };
    this.clearSession = this.clearSession.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.notifyMissing = this.notifyMissing.bind(this);
    this.notifyWrong = this.notifyWrong.bind(this);
  }

  componentDidMount() {}

  // every keystroke within the form will update the state
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  notifyMissing = (missingVariable) => {
    toast(
      `A required field is missing. You must enter a valid ${missingVariable}.`
    );
  };

  notifyWrong = (missingVariable) => {
    toast(`You must enter a valid ${missingVariable}`);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { streetAddress, city, state, zipCode } = this.state;

    // The length checks ensure that something is entered, but doesn't cover validation of deliberate invalid addresses ("dsf" or "n/a") or invalid address entered by mistake ("3 MNain Street"). Ideally, to get clean data, there would be a check of the input addresses in real time against a "address correction/validation/verification" database or API
    if (
      !streetAddress ||
      streetAddress.length < 2 ||
      !city ||
      city.length < 2 ||
      !state ||
      !zipCode ||
      zipCode.length !== 5
    ) {
      // how to handle each issue with the form data
      if (!streetAddress) this.notifyMissing('street address');
      if (streetAddress.length === 1) {
        this.notifyWrong('street address');
      }
      if (!city) this.notifyMissing('city');
      if (city.length === 1) {
        this.notifyWrong('city');
      }
      if (!state) {
        this.notifyMissing('choice of state');
      }
      if (!zipCode) this.notifyMissing('zip code');
      if (zipCode && zipCode.length !== 5) this.notifyWrong('zip code');
      return;
    }

    // if data passes above basic validation checks
    if (streetAddress && city && state && zipCode) {
      if (zipCode < 1 || zipCode > 99950) {
        this.notifyWrong(`zip code`);
        return;
      }
      // add to the session storage items instead of adding to a database line item that would have been created on the first page, by using this code: this.props.putUser(email, streetAddress, city, state, zipCode);

      // set session store items with entered information
      sessionStorage.setItem('streetAddress', streetAddress);
      sessionStorage.setItem('city', city);
      sessionStorage.setItem('state', state);
      sessionStorage.setItem('zipCode', zipCode);

      // go to confirmation page
      window.location.href = `/confirmation`;
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
          <h1>Form 3 of 3</h1>
        </header>
        <div>
          <FormThree change={this.handleChange} submit={this.handleSubmit} />
        </div>
        <div id="nav">
          {/* clears session store with this page exit */}
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              this.clearSession();
            }}
          >
            Exit to Home Page
          </Button>
        </div>
      </div>
    );
  }
}

// map dispatch to props

const mapDispatchToProps = (dispatch) => ({
  putUser: (email, streetAddress, city, state, zipCode) =>
    dispatch(addUserFormThree(email, streetAddress, city, state, zipCode)),
});

export default connect(null, mapDispatchToProps)(Third);
