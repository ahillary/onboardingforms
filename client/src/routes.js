import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import First from './app/components/one/FirstPage';
import Second from './app/components/two/SecondPage';
import Third from './app/components/three/ThirdPage';
import Confirmation from './app/components/confirmation';
import Success from './app/components/success';
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
        <Route path="/success" element={<Success />} />
      </Routes>
      // </BrowserRouter>
    );
  }
}

export default TheRoutes;
