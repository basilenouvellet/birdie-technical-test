// @flow

import { types } from './TableActions';
import type { TableActionType } from './TableActions';

export type TableStateColumnsType = Array<string>;
export type TableStateVariableType = ?string;
export type TableStateDataType = Array<Object>;
export type TableStateErrorType = {|
  columns: boolean,
  data: boolean,
|};

export type TableStateType = {|
  columns: TableStateColumnsType,
  variable: TableStateVariableType,
  data: TableStateDataType,
  error: TableStateErrorType,
|};

const initialState: TableStateType = {
  columns: [],
  variable: null,
  data: [],
  error: {
    columns: false,
    data: false,
  },
};

const TableReducer = (
  state: TableStateType = initialState,
  action: TableActionType,
): TableStateType => {
  switch (action.type) {
    case types.SET_VARIABLE: {
      const { variable } = action.payload;

      return {
        ...state,
        variable,
      };
    }
    case types.FETCH_COLUMNS_FAILED: {
      const { error } = action;

      console.error('Error while fetching columns\n', error);

      return {
        ...state,
        error: {
          ...state.error,
          columns: true,
        },
      };
    }
    case types.SET_COLUMNS: {
      const { columns } = action.payload;

      return {
        ...state,
        columns,
      };
    }
    case types.FETCH_DATA_FAILED: {
      const { error, variable } = action;

      console.error(`Error while fetching data with variable '${variable}'\n`, error);

      return {
        ...state,
        error: {
          ...state.error,
          data: true,
        },
      };
    }
    case types.SET_DATA: {
      const { data } = action.payload;

      return {
        ...state,
        data,
      };
    }
    case types.RESET_DATA: {
      return {
        ...state,
        data: [],
      };
    }
    default:
      return state;
  }
};

export default TableReducer;
