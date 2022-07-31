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
      password: sessionStorage.getItem('password'),
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
    if (event.target.name === 'province') {
      this.setState({
        [this.state.state]: this.state.province,
        [event.target.name]: event.target.value,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var { state } = this.state;
    if (state === 'Province') {
      state = this.state.province;
    }
    const { streetAddress, city, zipCode } = this.state;

    if (!streetAddress || !city || !state || !zipCode) {
      alert('A required field is missing.');
      return;
    }
    if (streetAddress && city && state && zipCode) {
      // this.props.putUser(email, streetAddress, city, state, zipCode);

      sessionStorage.setItem('streetAddress', streetAddress);
      sessionStorage.setItem('city', city);
      sessionStorage.setItem('state', state);
      sessionStorage.setItem('zipCode', zipCode);

      window.location.href = `/confirmation`;
    } else {
      alert(`Error with handleSumit`);
      return;
    }
  };

  render() {
    return (
      <div id="forms">
        <header>
          <h1>Page 3 of 3</h1>
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <h3>What's your physical address?</h3>
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
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
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
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VA">VA</option>
                <option value="VT">VT</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>
                <option value="WV">WV</option>
                <option value="WY">WY</option>
                <option value="Province">Province</option>
              </select>
            </div>
            <div>
              {this.state.state === 'Province' ? (
                <>
                  <label htmlFor="Province">Province</label>
                  <br />
                  <input
                    name="province"
                    type="text"
                    placeholder="Ex: Puerto Rico"
                    onChange={this.handleChange}
                  />
                </>
              ) : (
                <></>
              )}
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
              <button type="submit">Submit</button>
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

const mapDispatchToProps = (dispatch) => ({
  putUser: (email, streetAddress, city, state, zipCode) =>
    dispatch(addUserFormThree(email, streetAddress, city, state, zipCode)),
});

export default connect(null, mapDispatchToProps)(Third);
