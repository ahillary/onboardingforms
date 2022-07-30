import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { addUserFormTwo, allUsers } from '../store/user/users';

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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.seeAllUsers();
  }

  // every keystroke within the form will update the state
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { firstName, lastName, number, email } = this.state;
    if (!firstName || !lastName || !number) {
      alert('A required field is missing.');
      return;
    }
    if (firstName && lastName && number) {
      await this.props.putUser(email, firstName, lastName, number);
    } else {
      alert(`Error with handleSumit`);
      return;
    }

    sessionStorage.setItem('firstName', firstName);
    sessionStorage.setItem('lastName', lastName);
    sessionStorage.setItem('number', number);

    // with the success redirect to FormThree
  };

  log(props) {
    console.log('Full list of the props ', props);
    console.log('Full list of the state ', this.state);
    console.log(
      'session email: ',
      sessionStorage.getItem('email'),
      'session firstName: ',
      sessionStorage.getItem('firstName'),
      'state username: ',
      this.state.username
    );
  }

  render() {
    return (
      <div id="forms">
        <header>
          <h1>Page 2 of 3</h1>
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
  const { submit, change, firstName, lastName, number, error } = data;
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
          {/* <Link to={`/formThree`}> */}
          {/* {this.state.username} */}
          <button type="submit">Submit</button>
          {/* </Link> */}
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div>
        <p /> <Link to="/formThree">See next page without submitting</Link>
        <p /> <Link to="/formOne">Go back without submitting</Link>
        <p /> <Link to="/">Exit to Home Page</Link>
      </div>
    </div>
  );
};

// container - mapping state and dispatch to props
const mapStateToProps = (state) => {
  return {
    userList: state.users,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    putUser: (email, firstName, lastName, number) =>
      dispatch(addUserFormTwo(email, firstName, lastName, number)),
    seeAllUsers: () => dispatch(allUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Second);

// checking Prop Types
Second.propTypes = {
  userListState: PropTypes.array,
};
