import * as React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary component', () => {
  it('should shallow render without crashing', () => {
    shallow(<ErrorBoundary />);
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<ErrorBoundary />);
    expect(wrapper).toMatchSnapshot();
  });
});
