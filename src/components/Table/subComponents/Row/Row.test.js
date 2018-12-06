import * as React from 'react';
import { shallow } from 'enzyme';

import Row from './Row';

describe('Row component', () => {
  it('should shallow render without crashing', () => {
    const row = (
      <Row
        index={0}
        variable="education"
        count={100}
        averageAge={200}
      />
    );

    shallow(row);
  });

  it('should match snapshot', () => {
    const row = (
      <Row
        index={1000}
        variable="education"
        count={1000}
        averageAge={1000}
      />
    );

    const wrapper = shallow(row);
    expect(wrapper).toMatchSnapshot();
  });
});
