import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { First } from './app/components/formOne';
import { Second } from './app/components/formTwo';
import { Third } from './app/components/formThree';
import { Confirmation } from './app/components/confirmation';
import ToStart from './app/components/start';

class TheRoutes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ToStart />} />
          <Route exact path="/formOne" element={<First />} />
          <Route exact path="/formTwo" element={<Second />} />
          <Route exact path="/formThree" element={<Third />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default TheRoutes;
