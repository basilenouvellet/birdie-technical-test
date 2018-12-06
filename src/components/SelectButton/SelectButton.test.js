import * as React from 'react';
import { shallow } from 'enzyme';

import { SelectButtonUnconnected as SelectButton } from './SelectButton';

describe('SelectButton component', () => {
  let wrapper;

  const reduxStoreProps = {
    // map state to props
    columns: ['column1', 'column2', 'column3'],
    variable: 'column2',
    error: {
      column: false,
      data: false,
    },
    // map dispatch to props
    fetchColumns: jest.fn(),
    fetchData: jest.fn(),
    setVariable: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(
      <SelectButton
        columns={reduxStoreProps.columns}
        variable={reduxStoreProps.variable}
        error={reduxStoreProps.error}
        fetchColumns={reduxStoreProps.fetchColumns}
        fetchData={reduxStoreProps.fetchData}
        setVariable={reduxStoreProps.setVariable}
      />,
    );
  });

  it('should shallow render without crashing', () => {}); // done in beforeEach()

  it('should match snapshot', () => { expect(wrapper).toMatchSnapshot(); });
});
