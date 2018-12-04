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

    onButtonClick = () => {
        const { fetchData } = this.props;
        fetchData('education');
    };

    renderButton() {
        const { variable } = this.props;

        return (
            <button
                onClick={this.onButtonClick}
                style={{
                    width: '200px',
                    height: '50px',
                }}
            >
                {variable}
            </button>
        );
    }

    renderRows() {
        const { variable, data } = this.props;

        return data.map((row, index) => (
            <div
                key={row[variable]}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <div>{index}</div>
                <div>{row[variable]}</div>
                <div>{row['COUNT(education)']}</div>
                <div>{row['AVG(age)']}</div>
            </div>
        ));
    }

    // ------------------------------------------- Render ------------------------------------------
    render() {
        return (
            <div className="table">
                {this.renderButton()}
                {this.renderRows()}
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({
    variable: state.variable,
    data: state.data,
});

const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({
    fetchData: (variable) => {
        dispatch(TableActions.fetchDataAction(variable));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Table);
