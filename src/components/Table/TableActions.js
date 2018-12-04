// @flow

export const TABLE_ACTIONS_TYPES = {
    changeVariable: 'TABLE_ACTIONS_TYPES/changeVariable',
    fetchTest: 'TABLE_ACTIONS_TYPES/fetchTest',
};

export function changeVariableAction(variable) {
    return {
        type: TABLE_ACTIONS_TYPES.changeVariable,
        payload: {
            variable,
        },
    };
}

export function fetchTestAction() {
    return {
        type: TABLE_ACTIONS_TYPES.fetchTest,
        payload: {},
    };
}
