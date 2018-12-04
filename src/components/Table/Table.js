// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { TableActions } from './index';

import type { AppStateType } from '../../rootReducer';      // TODO: Is it the RIGHT PATH?

import './Table.css';

type MappedStatePropsType = {||};
type MappedDispatchPropsType = {||};
type OwnPropsType = {||};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;

type StateType = {||};

class Table extends React.Component<PropsType, StateType> {
    state = {};

    // ------------------------------------------- Render -------------------------------------------
    render() {
        const { variable, changeVariable, fetchTest } = this.props;

        return (
            <div className="table">
                <button onClick={() => {
                    // changeVariable(Math.random() * 100);
                    fetchTest();
                }}>
                    Change variable
                </button>

                {variable.map((row, index) => (
                    <div key={row.education}
                        style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-around',
                    }}
                    >
                        <div>{index}</div>
                        <div>{row.education}</div>
                        <div>{row['COUNT(education)']}</div>
                        <div>{row['AVG(age)']}</div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({
    variable: state.variable,
});

const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({
    changeVariable: (variable) => {
        dispatch(TableActions.changeVariableAction(variable));
    },
    fetchTest: () => {
        dispatch(TableActions.fetchTestAction());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Table);
