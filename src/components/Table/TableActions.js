// @flow

export const TABLE_ACTIONS_TYPES = {
    changeVariable: 'TABLE_ACTIONS_TYPES/changeVariable',
    fetchColumns: 'TABLE_ACTIONS_TYPES/fetchColumns',
    fetchData: 'TABLE_ACTIONS_TYPES/fetchData',
    columnsFetched: 'TABLE_ACTIONS_TYPES/columnsFetched',
    dataFetched: 'TABLE_ACTIONS_TYPES/dataFetched',
};

export function changeVariableAction(variable) {
    return {
        type: TABLE_ACTIONS_TYPES.changeVariable,
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

export function dataFetchedAction(data) {
    return {
        type: TABLE_ACTIONS_TYPES.dataFetched,
        payload: {
            data,
        },
    };
}

export function columnsFetchedAction(columns) {
    return {
        type: TABLE_ACTIONS_TYPES.columnsFetched,
        payload: {
            columns,
        },
    };
}
