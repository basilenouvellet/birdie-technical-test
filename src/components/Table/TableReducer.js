// @flow

import { types } from './TableActions';
import type { TableActionType } from './TableActions';

export type TableStateColumnsType = Array<string>;
export type TableStateVariableType = ?string;
export type TableStateDataType = Array<Object>;

export type TableStateType = {|
  columns: TableStateColumnsType,
  variable: TableStateVariableType,
  data: TableStateDataType,
|};

const initialState: TableStateType = {
  columns: [],
  variable: null,
  data: [],
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
    case types.SET_COLUMNS: {
      const { columns } = action.payload;

      return {
        ...state,
        columns,
      };
    }
    default:
      return state;
  }
};

export default TableReducer;
