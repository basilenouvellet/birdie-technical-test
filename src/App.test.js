import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App component', () => {
  it('should shallow render without crashing', () => {
    shallow(<App />);
  });
});
