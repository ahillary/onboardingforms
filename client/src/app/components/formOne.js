import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import { addUserFormOne } from '../store/user/users';
import { checkCurrentUser } from '../store/user/user';

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
    this.notifyMissing = this.notifyMissing.bind(this);
    this.checkDbForEmail = this.checkDbForEmail.bind(this);
    this.clearSession = this.clearSession.bind(this);
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

  checkDbForEmail = async (email) => {
    console.log('first the props.userIs: ', this.props.userIs);
    if (this.props.userIs !== []) {
      // if already checked for a user the array will have something in it, which could cause an issue. Need to address this edge case
    }

    // check the db for the email
    await this.props.checkDb(email);
    console.log('the props about checking db: ', this.props);

    // if there is a user, first make sure you are looking at the right one (edge case stated above) then return a message of error. If the correct email is being looked at (use === ) then continue with onboarding
    try {
      if (this.props.userIs) {
        return console.log('found in db: ', this.props.userIs);
      }
    } catch {
      alert(
        'Email already linked with an account. Sign in or use a different email to create an account.'
      );
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password } = this.state;

    // There is no need to validate these entries except checking against already exisiting data (email and username) in the database to avoid duplicate accounts.
    // Validating for an accurate email address will not catch common typos or prevent users from intentially entering invalid/made-up email addresses. To validate an email address, the ideal way is to send a confirmation email and have the user confirm. This is the most secure and ethical (e.g. a user cannot sign someone up to a service without permission).
    if (!email || !password || !username) {
      if (!email) this.notifyMissing('email');
      if (!password) {
        this.notifyMissing('password');
      }
      if (!username) {
        this.notifyMissing('username');
      }
      return;
    }

    // let result = this.checkDbForEmail(email);

    // console.log('check db: ', result);

    // if (this.checkDbForEmail(email)) {
    //   return;
    // }
    // check database for email address
    // check database for username
    // toast message that it is already in the database
    // return

    if (password.length < 6) {
      toast(`Please create a more secure password`);
      return;
    }

    if (email && password && username) {
      // Create session storage items instead of adding to the database on the first page using this code: await this.props.addAUser(email, username, password);

      // set session store items with entered information
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', this.state.password);

      // go to formTwo page
      // window.location.href = `/formTwo`;
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
          <h1>Page 1 of 3</h1>
        </header>
        <div>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              this.checkDbForEmail(this.state.email);
              console.log('on click props: ', this.props);
              console.log('on click state: ', this.state);
            }}
          >
            check db
          </Button>
        </div>
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

const mapStateToProps = (state) => {
  return {
    userIs: state.user,
    email: state.email,
  };
};
// mapping dispatch to props

const mapDispatchToProps = (dispatch) => {
  return {
    addAUser: (email, username, password) =>
      dispatch(addUserFormOne(email, username, password)),
    checkDb: (email) => dispatch(checkCurrentUser(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(First);
