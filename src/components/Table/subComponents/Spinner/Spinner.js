// @flow

import * as React from 'react';

import './Spinner.css';

function Spinner(): React.Element<'div'> {
  return (
    <div className="spinner">
      <div className="sk-cube1 sk-cube" />
      <div className="sk-cube2 sk-cube" />
      <div className="sk-cube4 sk-cube" />
      <div className="sk-cube3 sk-cube" />
    </div>
  );
}

export default Spinner;
