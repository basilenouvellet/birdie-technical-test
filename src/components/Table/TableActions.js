// @flow

export const types = {
  SET_VARIABLE: 'table/SET_VARIABLE',
  FETCH_COLUMNS: 'table/FETCH_COLUMNS',
  FETCH_DATA: 'table/FETCH_DATA',
  SET_COLUMNS: 'table/SET_COLUMNS',
  SET_DATA: 'table/SET_DATA',
  RESET_DATA: 'table/RESET_DATA',
};

export function setVariableAction(variable) {
  return {
    type: types.SET_VARIABLE,
    payload: {
      variable,
    },
  };
}

export function fetchColumnsAction() {
  return {
    type: types.FETCH_COLUMNS,
    payload: {},
  };
}

export function fetchDataAction(variable) {
  return {
    type: types.FETCH_DATA,
    payload: {
      variable,
    },
  };
}

export function setDataAction(data) {
  return {
    type: types.SET_DATA,
    payload: {
      data,
    },
  };
}

export function resetDataAction() {
  return {
    type: types.RESET_DATA,
    payload: {},
  };
}

export function setColumnsAction(columns) {
  return {
    type: types.SET_COLUMNS,
    payload: {
      columns,
    },
  };
}
