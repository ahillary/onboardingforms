import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUserFormThree } from '../store/user/userReducer';
import { fetchUser } from '../store/user/userAction';

export class Third extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
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
    const form = 'three';
    // find user in database
    // if (!user) {
    //   return 'No one is here';
    // }
    // get id after finding user in database

    const { streetAddress, city, state, zipCode } = event;
    if (!streetAddress || !city || !state || !zipCode) {
      alert('A required field is missing.');
      return;
    }
    if (streetAddress && city && state && zipCode) {
      //
      //
      //
      //
      //
      //
      //
      //
      // add id from backend
      this.props.putUser(form, streetAddress, city, state, zipCode);
      // if success axios will send success response
      // with the success redirect to Confirmation
    } else {
      alert(`Error with handleSumit`);
      return;
    }
  };

  render() {
    return (
      <div id="forms">
        <header>
          <h1>Page 3 of 3</h1>
        </header>
        <FormThree />
      </div>
    );
  }
}

const FormThree = (props) => {
  const { handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>What's your contact address?</h3>
        </div>
        <p />
        <div>
          <label htmlFor="streetAddress">
            <small>Street Address</small>
          </label>
          <input name="streetAddress" type="text" />
        </div>
        <p />
        <div>
          <label htmlFor="city">
            <small>City</small>
          </label>
          <input name="city" type="text" />
        </div>
        <p />
        <div>
          <label htmlFor="state">
            <small>state</small>
          </label>
          <input name="state" type="text" />
        </div>
        <p />
        <div>
          <label htmlFor="zipCode">
            <small>Zip Code</small>
          </label>
          <input name="zipCode" type="text" />
        </div>
        <p />
        <div>
          <button type="submit">Finalize</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>

      <div id="forms">
        <p /> <Link to="/confirmation">Finish</Link>
        <p /> <Link to="/formTwo">Go back without submitting</Link>
        <p /> <Link to="/formOne">Start Over</Link>
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
  putUser: (form, streetAddress, city, state, zipCode) =>
    dispatch(addUserFormThree(form, streetAddress, city, state, zipCode)),
});

connect(mapStateToProps, mapDispatchToProps)(Third);

export default Third;
