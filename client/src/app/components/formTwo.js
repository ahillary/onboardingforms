import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { addUserFormTwo } from '../store/user/users';

// This form is intentionally done differently solely to display another approach to React components

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
  }

  componentDidMount() {}

  // every keystroke within the form will update the state
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { firstName, lastName, number } = this.state;
    if (!firstName || !lastName || !number) {
      alert('A required field is missing.');
      return;
    }
    if (firstName && lastName && number) {
      // await this.props.putUser(email, firstName, lastName, number);
      sessionStorage.setItem('firstName', firstName);
      sessionStorage.setItem('lastName', lastName);
      sessionStorage.setItem('number', number);

      // go to FormThree
      window.location.href = `/formThree`;
    } else {
      alert(`Error with handleSumit`);
      return;
    }
  };

  render() {
    return (
      <div id="forms">
        <header>
          <h1>Page 2 of 3</h1>
        </header>
        <FormTwo
          {...this.state}
          change={this.handleChange}
          submit={this.handleSubmit}
        />
      </div>
    );
  }
}

const FormTwo = (data) => {
  const { submit, change, firstName, lastName, number } = data;
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <h3>What's your name and number?</h3>
        </div>
        <p />
        <div>
          <label htmlFor="firstName">First Name</label>
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
          <label htmlFor="lastName">Last Name</label>
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
            Enter ten digits without any spaces, dashes, or other symbols
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
      </form>
      <div>
        {/* clear session store with this exit */}
        <p /> <Link to="/">Exit to Home Page</Link>
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
