// @flow

import { TABLE_ACTIONS_TYPES } from './TableActions';

const TableReducer = (state = {
    variable: [],
}, action) => {
    switch (action.type) {
        case TABLE_ACTIONS_TYPES.changeVariable:
            const { variable } = action.payload;

            return {
                ...state,
                variable,
            };
        default:
            return state;
    }
};

export default TableReducer;
