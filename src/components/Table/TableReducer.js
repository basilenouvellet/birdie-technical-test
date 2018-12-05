// @flow

import { types } from './TableActions';

const initialState = {
  columns: [],
  variable: null,
  data: [],
};

const TableReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VARIABLE: {
      const { variable } = action.payload;

      return { ...state, variable };
    }
    case types.SET_DATA: {
      const { data } = action.payload;

      return { ...state, data };
    }
    case types.RESET_DATA: {
      return { ...state, data: [] };
    }
    case types.SET_COLUMNS: {
      const { columns } = action.payload;

      return { ...state, columns };
    }
    default:
      return state;
  }
};

export default TableReducer;
