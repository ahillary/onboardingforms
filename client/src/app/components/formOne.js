import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSignUpFormOne } from '../store/user/userThunkAndReducer';

export class First extends React.Component {
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

  componentDidMount() {}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = 'one';
    const { username, email, password } = event;
    if (!email || !password || !username) {
      alert('A required field is missing.');
      return;
    }
    if (email && password && username) {
      this.props.addUser(form, email, username, password);
      // if success axios will send success response
      // with the success redirect to FormTwo
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
        <FormOne />
      </div>
    );
  }
}
const FormOne = (props) => {
  const { handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <p />
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <p />
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <p />
        <div>
          <button type="submit">Continue</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <div>
        <p /> <Link to="/formTwo">Continue</Link>
      </div>
    </div>
  );
};

// container, mapping state and dispatch to props

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    username: state.user.username,
    password: state.user.password,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addUser: (form, email, username, password) =>
    dispatch(addSignUpFormOne(form, email, username, password)),
});

connect(mapStateToProps, mapDispatchToProps)(First);
