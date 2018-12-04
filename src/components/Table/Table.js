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
        const { variable, changeVariable } = this.props;

        return (
            <div className="table">
                <button onClick={() => { changeVariable(Math.random()*100); }}>
                    Change variable
                </button>
                {variable}
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({
    variable: state.variable,
});

const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({
    changeVariable: (variable) => { dispatch(TableActions.changeVariableAction(variable)) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Table);
