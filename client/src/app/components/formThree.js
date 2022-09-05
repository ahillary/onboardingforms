import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
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
          <h1>Page 3 of 3</h1>
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div id="title">
              <h3>What's your physical address?</h3>
            </div>
            <p />
            <div>
              <label htmlFor="streetAddress">Street address</label>
              <br />
              <input
                name="streetAddress"
                type="text"
                size={20}
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
                size={20}
                value={this.state.city}
                placeholder="Ex: Big City"
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="state">State</label>
              <br />
              <select
                name="state"
                value={this.state.state}
                onChange={this.handleChange}
              >
                <option value="">Select One</option>
                <option value="AK">AK</option>
                <option value="AL">AL</option>
                <option value="AR">AR</option>
                <option value="AS">AS - American Samoa</option>
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DC">DC - Washington, D.C.</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="GU">GU - Guam</option>
                <option value="HI">HI</option>
                <option value="IA">IA</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="MA">MA</option>
                <option value="MD">MD</option>
                <option value="ME">ME</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MO">MO</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="MP">MP - Northern Mariana Islands</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="NE">NE</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NV">NV</option>
                <option value="NY">NY</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="PR">PR - Puerto Rico</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VA">VA</option>
                <option value="VI">VI - US Virgin Islands</option>
                <option value="VT">VT</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>
                <option value="WV">WV</option>
                <option value="WY">WY</option>
              </select>
            </div>
            <p />
            <div>
              <label htmlFor="zipCode">Zip code</label>
              <br />
              <input
                name="zipCode"
                max={99950}
                maxLength={5}
                min={1}
                minLength={5}
                type="tel"
                size={20}
                value={this.state.zipCode}
                placeholder="Ex: 53099"
                onChange={this.handleChange}
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
          {/* clears session store with this exit */}
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              this.ClearSession();
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
