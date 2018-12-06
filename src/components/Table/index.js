// @flow

import Table from './Table';
import * as TableActions from './TableActions';
import tableReducer from './TableReducer';
import tableSaga from './TableSaga';

// export types
export * from './TableReducer';
export * from './TableActions';

// export Component, Actions, Reducer and Saga
export {
  Table as default,
  TableActions,
  tableReducer,
  tableSaga,
};
