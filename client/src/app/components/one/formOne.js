import React from 'react';
import { Form, Field } from 'react-final-form';
import { Toaster } from 'react-hot-toast';

let FormOne = (props) => {
  const { submit, change } = props;
  return (
    <div>
      <Form
        onSubmit={submit}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <div id="forms">
            <form id="one" onSubmit={handleSubmit} onChange={change}>
              <div id="title">
                <h3>Let's create your login</h3>
              </div>
              <p />
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <label>Email</label>
                    <p />
                    <input
                      {...input}
                      type="text"
                      placeholder="Ex: hello@there.org"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <br />
              <Field name="username">
                {({ input, meta }) => (
                  <div>
                    <label>Username</label>
                    <p />
                    <input
                      {...input}
                      type="text"
                      placeholder="Ex: TheCakeIsALie"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <br />
              <Field name="password">
                {({ input, meta }) => (
                  <div>
                    <label>Password</label>
                    <p />
                    <input
                      {...input}
                      type="text"
                      placeholder="ssshhhh it's a secret"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <p />
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              <Toaster />
            </form>
          </div>
        )}
      />
    </div>
  );
};

export default FormOne;
