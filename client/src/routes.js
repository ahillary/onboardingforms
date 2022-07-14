import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import First from './app/components/formOne';
import { Second } from './app/components/formTwo';
import { Third } from './app/components/formThree';
import { Confirmation } from './app/components/confirmation';
import HomePage from './app/components/homePage';

class TheRoutes extends Component {
  render() {
    return (
      // <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/formOne" element={<First />} />
        <Route exact path="/formTwo" element={<Second />} />
        <Route exact path="/formThree" element={<Third />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
      // </BrowserRouter>
    );
  }
}

export default TheRoutes;
