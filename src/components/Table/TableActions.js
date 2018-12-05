// @flow

export const TABLE_ACTIONS_TYPES = {
  setVariable: 'TABLE_ACTIONS_TYPES/setVariable',
  fetchColumns: 'TABLE_ACTIONS_TYPES/fetchColumns',
  fetchData: 'TABLE_ACTIONS_TYPES/fetchData',
  setColumns: 'TABLE_ACTIONS_TYPES/setColumns',
  setData: 'TABLE_ACTIONS_TYPES/setData',
  resetData: 'TABLE_ACTIONS_TYPES/resetData',
};

export function setVariableAction(variable) {
  return {
    type: TABLE_ACTIONS_TYPES.setVariable,
    payload: {
      variable,
    },
  };
}

export function fetchColumnsAction() {
  return {
    type: TABLE_ACTIONS_TYPES.fetchColumns,
    payload: {},
  };
}

export function fetchDataAction(variable) {
  return {
    type: TABLE_ACTIONS_TYPES.fetchData,
    payload: {
      variable,
    },
  };
}

export function setDataAction(data) {
  return {
    type: TABLE_ACTIONS_TYPES.setData,
    payload: {
      data,
    },
  };
}

export function resetDataAction() {
  return {
    type: TABLE_ACTIONS_TYPES.resetData,
    payload: {},
  };
}

export function setColumnsAction(columns) {
  return {
    type: TABLE_ACTIONS_TYPES.setColumns,
    payload: {
      columns,
    },
  };
}
