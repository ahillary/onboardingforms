import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addSignUpFormTwo } from '../store/user/userThunkAndReducer';
import { fetchUser } from '../store/user/userAction';

export class Second extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      number: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.props.loadUser();
    // id will come from database after backend creates the user with an id
    // id: this.props.user.id,
    // this.props.loadUser(this.props.match.params.id);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = 'two';
    // find user in database
    // if (!user) {
    //   return 'No one is here';
    // }
    // get id after finding user in database
    const { firstName, lastName, number } = event;
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
      this.props.putUser(form, firstName, lastName, number);
      // if success axios will send success response
      // with the success redirect to FormThree
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
          <button type="submit">Submit</button>
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
    error: state.user.error,
  };
};

//
//
//
//
//
//
//
// add id from backend
const mapDispatchToProps = (dispatch) => ({
  loadUser: (id) => dispatch(fetchUser(id)),
  putUser: (form, firstName, lastName, number) =>
    dispatch(addSignUpFormTwo(form, firstName, lastName, number)),
});

connect(mapStateToProps, mapDispatchToProps)(Second);

export default Second;
