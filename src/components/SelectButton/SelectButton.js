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

// overwrite some of the default styles of React Select
const selectStyles = {
  option: provided => ({
    ...provided,
    textAlign: 'start',
  }),
};

// overwrite some colors of the default theme of React Select
const selectTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#6c61c9',
    primary25: 'rgba(108, 97, 201, .25)',
    primary50: 'rgba(108, 97, 201, .50)',
    primary75: 'rgba(108, 97, 201, .75)',
  },
});

// export unconnected component for test purposes with Jest
export class SelectButtonUnconnected extends React.Component<PropsType> {
  componentDidMount() {
    const { fetchColumns } = this.props;
    fetchColumns(); // fetch columns names in did mount
  }

  getOptions() {
    const { columns } = this.props;

    return columns
      .concat('THIS WILL FAIL') // add non existing column name to test error handling
      .sort() // sort alphabetically
      .map<*>(column => ({ // map to React Select options structure
        value: column,
        label: column.toLocaleString(), // how it is going to be displayed to the user
      }));
  }

  handleChange = (newOption: *) => {
    const {
      variable, setVariable, fetchData,
    } = this.props;

    const { value: newValue } = newOption;

    if (variable !== newValue) {
      setVariable(newValue); // set new variable value in the redux store
      fetchData(newValue); // start fetching the data corresponding to the new variable
    }
  };

  // ------------------------------------------- Render -------------------------------------------
  render(): React.Element<typeof Select | typeof ErrorMessage> {
    const { error } = this.props;
    if (error.columns) return <ErrorMessage />;

    const options = this.getOptions();

    return (
      <Select
        className="select-button"
        styles={selectStyles}
        theme={selectTheme}
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
)(SelectButtonUnconnected);
