import React from 'react';
import { Form, Field } from 'react-final-form';
import { Toaster } from 'react-hot-toast';

let FormTwo = (props) => {
  const { submit, change } = props;
  return (
    <div>
      <Form
        onSubmit={submit}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.phone) {
            errors.phone = 'Required';
          }
          if (
            !/^\(?(?!555)[2-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
              values.phone
            )
          ) {
            //Regex to exclude numbers starting with 555 or 0 or 1 and to match formats: 123-456-7890, (123) 456-7890, 123 456 7890, 123.456.7890, 1234567890
            errors.phone = 'Please enter a valid US phone number.';
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <div id="forms">
            <form id="two" onSubmit={handleSubmit} onChange={change}>
              <div id="title">
                <h3>What's your name and number?</h3>
              </div>
              <p />
              <Field name="firstName">
                {({ input, meta }) => (
                  <div>
                    <label>First name</label>
                    <p />
                    <input {...input} type="text" placeholder="Ex: Ned" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <br />
              <Field name="lastName">
                {({ input, meta }) => (
                  <div>
                    <label>Last name</label>
                    <p />
                    <input {...input} type="text" placeholder="Ex: Flanders" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <br />
              <Field name="phone">
                {({ input, meta }) => (
                  <div>
                    <label>Phone number</label>
                    <p />
                    <input
                      {...input}
                      type="tel"
                      placeholder="Ex: (415)867-5309"
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
              {/* strictly for testing: */}
              {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
            </form>
          </div>
        )}
      />
    </div>
  );
};

export default FormTwo;
