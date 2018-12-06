// @flow

import { types } from './TableActions';
import type { TableActionType } from './TableActions';

// objects type in Table State
export type TableStateColumnsType = Array<string>;
export type TableStateVariableType = ?string;
export type TableStateDataType = Array<Object>;
export type TableStateErrorType = {|
  columns: boolean,
  data: boolean,
|};
export type TableStateLoadingType = boolean;

// Table State type
export type TableStateType = {|
  columns: TableStateColumnsType,
  variable: TableStateVariableType,
  data: TableStateDataType,
  error: TableStateErrorType,
  loading: TableStateLoadingType,
|};

// initial Table State
const initialState: TableStateType = {
  columns: [],
  variable: null,
  data: [],
  error: {
    columns: false,
    data: false,
  },
  loading: false,
};

// Table Reducer
const TableReducer = (
  state: TableStateType = initialState,
  action: TableActionType,
): TableStateType => {
  switch (action.type) {
    case types.SET_VARIABLE: {
      const { variable } = action.payload;

      // variable has been set
      // reset error and set loading to true
      return {
        ...state,
        variable,
        error: {
          columns: false,
          data: false,
        },
        loading: true,
      };
    }
    case types.FETCH_COLUMNS_FAILED: {
      const { error } = action;

      console.error('Error while fetching columns\n', error);

      // fetch columns failed
      // reset loading and set columns error to true
      return {
        ...state,
        error: {
          ...state.error,
          columns: true,
        },
        loading: false,
      };
    }
    case types.SET_COLUMNS: {
      const { columns } = action.payload;

      // fetch columns succeeded
      // reset loading and columns error
      return {
        ...state,
        columns,
        error: {
          ...state.error,
          columns: false,
        },
        loading: false,
      };
    }
    case types.FETCH_DATA_FAILED: {
      const { error, variable } = action;

      console.error(`Error while fetching data with variable '${variable}'\n`, error);

      // fetch data failed
      // reset loading and set data error to true
      return {
        ...state,
        error: {
          ...state.error,
          data: true,
        },
        loading: false,
      };
    }
    case types.SET_DATA: {
      const { data } = action.payload;

      // fetch data succeeded
      // reset loading and data error
      return {
        ...state,
        data,
        error: {
          ...state.error,
          data: false,
        },
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default TableReducer;
