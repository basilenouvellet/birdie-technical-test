// @flow

export const TABLE_ACTIONS_TYPES = {
    changeVariable: 'TABLE_ACTIONS_TYPES/changeVariable',
};

export function changeVariableAction(variable) {
    return {
        type: TABLE_ACTIONS_TYPES.changeVariable,
        payload: {
            variable,
        },
    };
}
