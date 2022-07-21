import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addUserFormOne, allUsers } from '../store/user/users';
import { currentUser, findThem } from '../store/user/user';

class First extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.seeAllUsers();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    if (!email || !password || !username) {
      alert('A required field is missing.');
      return;
    }
    if (email && password && username) {
      await this.props.addAUser(email, username, password);

      // while it would be ideal to use the user.id to find a user, in the edge case that more than one individual is creating an account simutaneously it would mess up the process with this function as written:
      // await this.props.findUserId();
      // therefore, finding the freshly created user in the database using their username is safer
      await this.props.thisUserIs(username);

      alert(`Welcome aboard, ${username}!`);

      // with the success redirect to FormTwo
      // window.location.href = `/formTwo`;
    } else {
      alert(`Error with handleSumit`);
      return;
    }
  };

  render() {
    return (
      <div id="forms">
        <header>
          <h1>Page 1 of 3</h1>
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <h3>How do you want to login?</h3>
            </div>
            <p />
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <Link
                to={`/formTwo`}
                // take te state to the form {...this.state}
              >
                <button type="submit">Submit</button>
              </Link>
            </div>
          </form>
          <div>
            <p /> <Link to="/formTwo">See next page without submitting</Link>
          </div>
          <p /> <Link to="/">Exit to Home Page</Link>
        </div>
      </div>
    );
  }
}

// container, mapping state and dispatch to props
const mapStateToProps = (state) => {
  return {
    userListState: state.users,
    email: state.user.email,
    username: state.user.username,
    id: state.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAUser: (form, email, username, password) =>
      dispatch(addUserFormOne(form, email, username, password)),
    thisUserIs: (username) => dispatch(currentUser(username)),
    // findUserId: () => dispatch(findThem()),
    seeAllUsers: () => dispatch(allUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(First);

// checking Prop Types
First.propTypes = {
  email: PropTypes.string,
  username: PropTypes.string,
  userListState: PropTypes.array,
  id: PropTypes.number,
};
