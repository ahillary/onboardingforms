import React from 'react';
import { Form, Field } from 'react-final-form';
import { Toaster } from 'react-hot-toast';

let FormThree = (props) => {
  const { submit, change } = props;
  return (
    <div>
      <Form
        onSubmit={submit}
        validate={(values) => {
          const errors = {};
          if (!values.streetAddress) {
            errors.streetAddress = 'Required';
          }
          if (!values.city) {
            errors.city = 'Required';
          }
          if (!values.state) {
            errors.state = 'Required';
          }
          if (!values.zipCode) {
            errors.zipCode = 'Required';
          }
          return errors;
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <div id="forms">
            <form id="one" onSubmit={handleSubmit} onChange={change}>
              <div id="title">
                <h3>What's your physical address?</h3>
              </div>
              <p />
              <Field name="streetAddress">
                {({ input, meta }) => (
                  <div>
                    <label>street address</label>
                    <p />
                    <input
                      {...input}
                      type="text"
                      placeholder="Ex: 123 Road Rd"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <br />
              <Field name="city">
                {({ input, meta }) => (
                  <div>
                    <label>city</label>
                    <p />
                    <input {...input} type="text" placeholder="Ex: Big City" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <br />
              <br />
              <Field name="state">
                {({ input, meta }) => (
                  <div>
                    <label>state</label>
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
              {/*
            <select
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
            >
              <option value="">Select One</option>
              <option value="AK">AK</option>
              <option value="AL">AL</option>
              <option value="AR">AR</option>
              <option value="AS">AS - American Samoa</option>
              <option value="AZ">AZ</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DC">DC - Washington, D.C.</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="GU">GU - Guam</option>
              <option value="HI">HI</option>
              <option value="IA">IA</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="MA">MA</option>
              <option value="MD">MD</option>
              <option value="ME">ME</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MO">MO</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="MP">MP - Northern Mariana Islands</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="NE">NE</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NV">NV</option>
              <option value="NY">NY</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="PR">PR - Puerto Rico</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VA">VA</option>
              <option value="VI">VI - US Virgin Islands</option>
              <option value="VT">VT</option>
              <option value="WA">WA</option>
              <option value="WI">WI</option>
              <option value="WV">WV</option>
              <option value="WY">WY</option>
            </select>
          </div>
          */}
              <br />
              <Field name="zipCode">
                {({ input, meta }) => (
                  <div>
                    <label>zip code</label>
                    <p />
                    <input {...input} type="text" placeholder="Ex: 53099" />
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

export default FormThree;
