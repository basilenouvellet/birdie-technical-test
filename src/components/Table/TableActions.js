// @flow

import type {
  TableStateVariableType,
  TableStateDataType,
  TableStateColumnsType,
} from './index';

// types
export type TableActionsTypesType = {|
  SET_VARIABLE: 'table/SET_VARIABLE',
  FETCH_COLUMNS: 'table/FETCH_COLUMNS',
  FETCH_COLUMNS_FAILED: 'table/FETCH_COLUMNS_FAILED',
  SET_COLUMNS: 'table/SET_COLUMNS',
  FETCH_DATA: 'table/FETCH_DATA',
  FETCH_DATA_FAILED: 'table/FETCH_DATA_FAILED',
  SET_DATA: 'table/SET_DATA',
|};
export const types: TableActionsTypesType = {
  SET_VARIABLE: 'table/SET_VARIABLE',
  FETCH_COLUMNS: 'table/FETCH_COLUMNS',
  FETCH_COLUMNS_FAILED: 'table/FETCH_COLUMNS_FAILED',
  SET_COLUMNS: 'table/SET_COLUMNS',
  FETCH_DATA: 'table/FETCH_DATA',
  FETCH_DATA_FAILED: 'table/FETCH_DATA_FAILED',
  SET_DATA: 'table/SET_DATA',
};

// set variable action
export type SetVariableActionType = {|
  type: typeof types.SET_VARIABLE,
  payload: {|
    variable: TableStateVariableType,
  |},
|};

export function setVariableAction(variable: TableStateVariableType): SetVariableActionType {
  return {
    type: types.SET_VARIABLE,
    payload: {
      variable,
    },
  };
}

// fetch columns action
export type FetchColumnsActionType = {|
  type: typeof types.FETCH_COLUMNS,
|};

export function fetchColumnsAction(): FetchColumnsActionType {
  return {
    type: types.FETCH_COLUMNS,
  };
}

// fetch columns failed action
export type FetchColumnsFailedActionType = {|
  type: typeof types.FETCH_COLUMNS_FAILED,
  error: *, // TODO: type
|};

export function fetchColumnsFailedAction(
  error: *, // TODO: type
): FetchColumnsFailedActionType {
  return {
    type: types.FETCH_COLUMNS_FAILED,
    error,
  };
}

// set columns action
export type SetColumnsActionType = {|
  type: typeof types.SET_COLUMNS,
  payload: {|
    columns: TableStateColumnsType,
  |},
|};

export function setColumnsAction(columns: TableStateColumnsType): SetColumnsActionType {
  return {
    type: types.SET_COLUMNS,
    payload: {
      columns,
    },
  };
}

// fetch data action
export type FetchDataActionType = {|
  type: typeof types.FETCH_DATA,
  payload: {|
    variable: TableStateVariableType,
  |},
|};

export function fetchDataAction(variable: TableStateVariableType): FetchDataActionType {
  return {
    type: types.FETCH_DATA,
    payload: {
      variable,
    },
  };
}

// fetch data failed action
export type FetchDataFailedActionType = {|
  type: typeof types.FETCH_DATA_FAILED,
  error: *, // TODO: type
  variable: TableStateVariableType,
|};

export function fetchDataFailedAction(
  error: *, // TODO: type
  variable: TableStateVariableType,
): FetchDataFailedActionType {
  return {
    type: types.FETCH_DATA_FAILED,
    error,
    variable,
  };
}

// set data action
export type SetDataActionType = {|
  type: typeof types.SET_DATA,
  payload: {|
    data: TableStateDataType,
  |},
|};

export function setDataAction(data: TableStateDataType): SetDataActionType {
  return {
    type: types.SET_DATA,
    payload: {
      data,
    },
  };
}

// Table Action Type
export type TableActionType =
  SetVariableActionType
  | FetchColumnsActionType
  | FetchColumnsFailedActionType
  | SetColumnsActionType
  | FetchDataActionType
  | FetchDataFailedActionType
  | SetDataActionType;
