// @flow

import { TABLE_ACTIONS_TYPES } from './TableActions';

const TableReducer = (state = {
    columns: [],
    variable: null,
    data: [],
}, action) => {
    switch (action.type) {
        case TABLE_ACTIONS_TYPES.setVariable:
            const { variable } = action.payload;

            return {
                ...state,
                variable,
            };
        case TABLE_ACTIONS_TYPES.setData:
            const { data } = action.payload;

            return {
                ...state,
                data,
            };
            case TABLE_ACTIONS_TYPES.setColumns:
            const { columns } = action.payload;

            return {
                ...state,
                columns,
            };
        default:
            return state;
    }
};

export default TableReducer;
