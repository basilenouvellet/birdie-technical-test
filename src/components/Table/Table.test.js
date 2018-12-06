// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { TableUnconnected as Table } from './Table';

describe('Table component', () => {
  let wrapper;

  const reduxStoreProps = {
    // map state to props
    variable: 'column2',
    data: [
      {
        column1: 'Male',
        count: 100,
        average_age: 50,
      },
      {
        column2: 'Female',
        count: 1000,
        average_age: 100,
      },
    ],
    error: {
      column: false,
      data: false,
    },
    loading: false,
  };

  beforeEach(() => {
    wrapper = shallow(
      <Table
        variable={reduxStoreProps.variable}
        data={reduxStoreProps.data}
        error={reduxStoreProps.error}
        loading={reduxStoreProps.loading}
      />,
    );
  });

  it('should shallow render without crashing', () => {}); // done in beforeEach()

  it('should match snapshot', () => { expect(wrapper).toMatchSnapshot(); });
});
