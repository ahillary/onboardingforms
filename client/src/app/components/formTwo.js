import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { addUserFormTwo, allUsers } from '../store/user/users';
import { currentUser } from '../store/user/user';

class Second extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      number: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.seeAllUsers();
    console.log('users list: ', this.props.userListState);

    // , this.props.match.params.email
    // console.log('what user? ', this.props.user);
    // id will come from database after backend creates the user with an id
    // id: this.props.user.id,
    // this.props.loadUser(this.props.match.params.email);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const form = 'two';
    // find user in database
    // if (!user) {
    //   return 'No one is here';
    // }
    // get id after finding user in database
    const { firstName, lastName, number } = this.state;
    if (!firstName || !lastName || !number) {
      alert('A required field is missing.');
      return;
    }
    if (firstName && lastName && number) {
      //
      //
      //
      //
      //
      //
      //
      // add id from backend
      await this.props.putUser(
        form,
        firstName,
        lastName,
        number
        // , username
      );
      // if success axios will send success response
      // with the success redirect to FormThree
    } else {
      alert(`Error with handleSumit`);
      return;
    }
  };

  log(props) {
    console.log('Full list of the props ', props);
    console.log('Full list of the state ', this.state);
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
          Props
        </Button>
        <FormTwo />
      </div>
    );
  }
}

const FormTwo = (props) => {
  const { handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>What's your name and number?</h3>
        </div>
        <p />
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <p />
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
        <p />
        <div>
          <label htmlFor="number">
            <small>Number</small>
          </label>
          <input name="number" type="text" />
        </div>
        <p />
        <div>
          <Link to={`/formThree`}>
            {/* {this.state.username} */}
            <button type="submit">Submit</button>
          </Link>
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
    userListState: state.users,
    username: state.user.username,
    id: state.user.id,
    // firstName: state.firstName,
    // lastName: state.lastName,
    // number: state.number,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (username) => dispatch(currentUser(username)),
    putUser: (form, firstName, lastName, number) =>
      dispatch(addUserFormTwo(form, firstName, lastName, number)),
    seeAllUsers: () => dispatch(allUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Second);

// checking Prop Types
Second.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  number: PropTypes.string,
  id: PropTypes.number,
};
