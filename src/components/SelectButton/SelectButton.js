// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import Select from "react-select";

import { TableActions } from "../Table";        // TODO: Create CSS file

import type { AppStateType } from '../../rootReducer';      // TODO: Is it the RIGHT PATH?

import './SelectButton.css';

type MappedStatePropsType = {||};
type MappedDispatchPropsType = {||};
type OwnPropsType = {||};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;

class SelectButton extends React.Component<PropsType> {
    componentDidMount() {
        const { fetchColumns } = this.props;
        fetchColumns();
    }

    getOptions() {
        const { columns } = this.props;

        return columns.map(column => ({
            value: column,
            label: column.toLocaleString(),
        }));
    }

    // ------------------------------------------ Render ------------------------------------------
    render(): React.Element<'div'> {
        return (
            <Select
                options={this.getOptions()}
            />
        );
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({
    columns: state.columns,
});

const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({
    fetchColumns: () => {
        dispatch(TableActions.fetchColumnsAction());
    },

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectButton);
