// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import Select from "react-select";

import { TableActions } from "../Table";

import type { AppStateType } from '../../rootReducer';      // TODO: Is it the RIGHT PATH?

import './SelectButton.css';

type MappedStatePropsType = {||};
type MappedDispatchPropsType = {||};
type OwnPropsType = {||};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;

const selectStyles = {
    option: (provided) => ({
        ...provided,
        textAlign: 'start',
    }),
};

class SelectButton extends React.Component<PropsType> {
    componentDidMount() {
        const { fetchColumns } = this.props;
        fetchColumns();
    }

    getOptions() {
        const { columns } = this.props;

        return columns
            .filter(column => column !== 'age')
            .map(column => ({
                value: column,
                label: column.toLocaleString(),
            }));
    }

    handleChange = (newOption) => {
        const { variable, setVariable, resetData, fetchData } = this.props;
        const { value: newValue } = newOption;

        if (variable !== newValue) {
            setVariable(newValue);
            resetData(); // reset data in store since it no longer matches the variable
            fetchData(newValue); // start fetching the data corresponding to the new variable
        }
    };

    // ------------------------------------------ Render ------------------------------------------
    render(): React.Element<'div'> {
        const options = this.getOptions();

        return (
            <Select
                className="select-button"
                styles={selectStyles}
                placeholder="Select a variable..."
                onChange={this.handleChange}
                options={options}
            />
        );
    }
}

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({
    columns: state.columns,
    variable: state.variable,
});

const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({
    fetchColumns: () => {
        dispatch(TableActions.fetchColumnsAction());
    },
    fetchData: (variable) => {
        dispatch(TableActions.fetchDataAction(variable));
    },
    setVariable: (variable) => {
        dispatch(TableActions.setVariableAction(variable));
    },
    resetData: () => {
        dispatch(TableActions.resetDataAction());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SelectButton);
