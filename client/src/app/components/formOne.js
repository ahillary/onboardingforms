import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { addUserFormOne, allUsers } from '../store/user/users';

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

  // every keystroke within the form will update the state
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    // if use <button type="submit"> also use:
    // event.preventDefault();
    const { username, email, password } = this.state;
    if (!email || !password || !username) {
      alert('A required field is missing.');
      return;
    }
    if (email && password && username) {
      await this.props.addAUser(email, username, password);
    } else {
      alert(`Error with handleSumit`);
      return;
    }

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('email', email);

    // with the success redirect to FormTwo
    // window.location.href = `/formTwo`;
  };

  log(props) {
    console.log('Full list of the props ', props);
    console.log('Full list of the state ', this.state);
    console.log(
      'state username: ',
      this.state.username,
      'and session email: ',
      sessionStorage.getItem('email')
    );
  }

  render() {
    return (
      <div id="forms">
        <header>
          <h1>Page 1 of 3</h1>
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
        <div>
          <form
            // instead of using react's onSubmit I added a button using ant design
            onSubmit={this.handleSubmit}
          >
            <div>
              <h3>What do you want to use to login again later?</h3>
            </div>
            <p />
            <div>
              <label htmlFor="email">Email </label>
              <br />
              <input
                name="email"
                type="text"
                value={this.state.email}
                placeholder="Ex: hello@there.org"
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
                placeholder="Ex: TheCakeIsALie"
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <label htmlFor="password">Password </label>
              <br />
              <input
                name="password"
                type="password"
                value={this.state.password}
                placeholder="ssshhhh keep this secret"
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  this.handleSubmit(this.state);
                }}
              >
                Submit
              </Button>
              <Button type="link">Button type=Link. EXPLORE THIS?</Button>
              {/* <Link
                to={`/formTwo`}
                // take te state to the form {...this.state}
              >
                <button type="submit">Submit</button>
              </Link> */}
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
    userList: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAUser: (email, username, password) =>
      dispatch(addUserFormOne(email, username, password)),
    seeAllUsers: () => dispatch(allUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(First);

// checking Prop Types
First.propTypes = {
  userListState: PropTypes.array,
};
