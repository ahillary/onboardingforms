import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import toast from 'react-hot-toast';
import FormTwo from './formTwo';
import { addUserFormTwo } from '../../store/';

class Second extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      username: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
      password: sessionStorage.getItem('password'),
    };
    this.clearSession = this.clearSession.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.notifyWrong = this.notifyWrong.bind(this);
  }

  componentDidMount() {}

  // every keystroke within the form will update the state
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  notifyWrong = (missingVariable) =>
    toast(`You must enter a valid ${missingVariable}`);

  handleSubmit = async (event) => {
    const { firstName, lastName, phone } = this.state;

    if (
      !firstName ||
      firstName.length < 2 ||
      !lastName ||
      lastName.length < 2
    ) {
      if (firstName && firstName.length < 2) this.notifyWrong('first name');
      if (lastName && lastName.length < 2) this.notifyWrong('last name');
      return;
    }

    if (firstName && lastName && phone) {
      // add to the session storage items instead of adding to a database line item that would have been created on the first page, by using this code: await this.props.putUser(email, firstName, lastName, phone);

      // todo: ensure the saved phone number is in a specific format

      // set session store items with entered information
      sessionStorage.setItem('firstName', firstName);
      sessionStorage.setItem('lastName', lastName);
      sessionStorage.setItem('phone', phone);

      // go to formThree page
      // window.location.href = `/formThree`;
    } else {
      alert(`Error with handleSubmit`);
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
          <h1>Form 2 of 3</h1>
        </header>
        <div>
          <FormTwo change={this.handleChange} submit={this.handleSubmit} />
        </div>
        <div id="nav">
          <p />
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

const mapDispatchToProps = (dispatch) => {
  return {
    putUser: (email, firstName, lastName, phone) =>
      dispatch(addUserFormTwo(email, firstName, lastName, phone)),
  };
};

export default connect(null, mapDispatchToProps)(Second);
