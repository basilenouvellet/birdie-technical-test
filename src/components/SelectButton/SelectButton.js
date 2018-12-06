// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import ErrorMessage from '../ErrorMessage';

import { TableActions } from '../Table';

import './SelectButton.css';

import type {
  TableStateColumnsType,
  TableStateType,
  TableStateVariableType,
  TableStateErrorType,
} from '../Table';

type MappedStatePropsType = {|
  columns: TableStateColumnsType,
  variable: TableStateVariableType,
  error: TableStateErrorType,
|};
type MappedDispatchPropsType = {|
  fetchColumns: () => void,
  fetchData: (variable: TableStateVariableType) => void,
  setVariable: (variable: TableStateVariableType) => void,
|};
type OwnPropsType = {||};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;

const selectStyles = {
  option: provided => ({
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
    const {
      variable, setVariable, fetchData,
    } = this.props;

    const { value: newValue } = newOption;

    if (variable !== newValue) {
      setVariable(newValue);
      fetchData(newValue); // start fetching the data corresponding to the new variable
    }
  };

  // ------------------------------------------- Render -------------------------------------------
  render(): React.Element<*> {
    const { error } = this.props;
    if (error.columns) return <ErrorMessage />;

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

const mapStateToProps = (state: TableStateType): MappedStatePropsType => ({
  columns: state.columns,
  variable: state.variable,
  error: state.error,
});

const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({
  fetchColumns: () => {
    dispatch(TableActions.fetchColumnsAction());
  },
  fetchData: (variable: TableStateVariableType): void => {
    dispatch(TableActions.fetchDataAction(variable));
  },
  setVariable: (variable: TableStateVariableType): void => {
    dispatch(TableActions.setVariableAction(variable));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectButton);
