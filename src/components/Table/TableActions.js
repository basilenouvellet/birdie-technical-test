// @flow

export const TABLE_ACTIONS_TYPES = {
    changeVariable: 'TABLE_ACTIONS_TYPES/changeVariable',
    fetchData: 'TABLE_ACTIONS_TYPES/fetchData',
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
