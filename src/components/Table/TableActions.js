// @flow

export const TABLE_ACTIONS_TYPES = {
    setVariable: 'TABLE_ACTIONS_TYPES/setVariable',
    fetchColumns: 'TABLE_ACTIONS_TYPES/fetchColumns',
    fetchData: 'TABLE_ACTIONS_TYPES/fetchData',
    setColumns: 'TABLE_ACTIONS_TYPES/setColumns',
    setData: 'TABLE_ACTIONS_TYPES/setData',
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

export function setColumnsAction(columns) {
    return {
        type: TABLE_ACTIONS_TYPES.setColumns,
        payload: {
            columns,
        },
    };
}
