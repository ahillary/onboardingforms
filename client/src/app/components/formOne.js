import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import { addUserFormOne } from '../store/user/users';

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
    this.ClearSession = this.ClearSession.bind(this);
  }

  componentDidMount() {}

  // every keystroke within the form will update the state
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  notify = (missingVariable) =>
    toast(`A required field is missing. You must enter a ${missingVariable}.`);

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password } = this.state;
    if (!email || !password || !username) {
      if (!email) this.notify('valid email address');
      if (!password) {
        this.notify('password');
      }
      if (!username) {
        this.notify('username');
      }
      return;
    }
    if (email && password && username) {
      // Create session storage items instead of adding to the database on the first page using this code: await this.props.addAUser(email, username, password);

      // set session store items with entered information
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', this.state.password);

      // go to formTwo page
      window.location.href = `/formTwo`;
    } else {
      alert(`Error with handleSumit`);
      return;
    }
  };

  ClearSession = () => {
    sessionStorage.clear();
    // go to Home page
    window.location.href = `/`;
  };

  render() {
    return (
      <div id="forms">
        <header>
          <h1>Page 1 of 3</h1>
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div id="title">
              <h3>Let's create your login</h3>
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
                placeholder="ssshhhh it's a secret"
                onChange={this.handleChange}
              />
            </div>
            <p />
            <div>
              <button type="submit">Submit</button>
              {/* <Button type="link">Button type=Link. EXPLORE THIS?</Button> */}
              {/* <Link
                to={`/formTwo`}
                // take te state to the form {...this.state}
              >
                <button type="submit">Submit</button>
              </Link> */}
            </div>
            <Toaster />
          </form>
        </div>
        <div id="nav">
          <p />
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

// mapping dispatch to props

const mapDispatchToProps = (dispatch) => {
  return {
    addAUser: (email, username, password) =>
      dispatch(addUserFormOne(email, username, password)),
  };
};

export default connect(null, mapDispatchToProps)(First);
