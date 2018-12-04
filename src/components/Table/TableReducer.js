// @flow

import { TABLE_ACTIONS_TYPES } from './TableActions';

const TableReducer = (state = {
    variable: null,
    data: [],
}, action) => {
    switch (action.type) {
        case TABLE_ACTIONS_TYPES.changeVariable:
            const { variable } = action.payload;

            return {
                ...state,
                variable,
            };
        case TABLE_ACTIONS_TYPES.dataFetched:
            const { data } = action.payload;

            return {
                ...state,
                data,
            };
        default:
            return state;
    }
};

export default TableReducer;
