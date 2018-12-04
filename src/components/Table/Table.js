// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { TableActions } from './TableActions';

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
        return (
            <div className="table">
                This is Table
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({});

const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Table);
