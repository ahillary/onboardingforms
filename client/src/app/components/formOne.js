import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { authSignUp } from '../store/user/user';

// import { Signup } from './app/components/formOne';
// <Signup />;
/** COMPONENT **/

const Form = () => {
  return <div>nothing to see here</div>;
};
// const FormOne = (props) => {
//   const { displayName, handleSubmit, error } = props;

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">
//             <small>Email</small>
//           </label>
//           <input name="email" type="text" />
//         </div>
//         <div>
//           <label htmlFor="username">
//             <small>Username</small>
//           </label>
//           <input name="username" type="text" />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" />
//         </div>
//         <div>
//           <button type="submit">{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//       </form>
//     </div>
//   );
// };

// /** CONTAINER **/

// const mapSignup = (state) => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.user.error,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault();
//       const { username, email, password } = evt;
//       // const email = evt.target.email.value;
//       // const username = evt.target.username.value;
//       // const password = evt.target.password.value;
//       if (!email || !password || !username) {
//         alert('A required field is missing.');
//         return;
//       }
//       if (email && password && username) {
//         dispatch(authSignUp(email, username, password));
//       } else {
//         alert('Error');
//         return;
//       }
//     },
//   };
// };

export const Signup = Form;
// connect(mapSignup, mapDispatch)(FormOne);

export class First extends React.Component {
  render() {
    return (
      <div id="formOne">
        <h1> FormOne</h1>
        <p /> <Link to="/formTwo">Continue</Link>
      </div>
    );
  }
}

// /** PROP TYPES **/
// FormOne.propTypes = {
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object,
// };
