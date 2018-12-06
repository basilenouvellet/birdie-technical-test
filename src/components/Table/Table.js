// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import Row from './subComponents/Row';
import Spinner from './subComponents/Spinner';

import './Table.css';

import type {
  TableStateType,
  TableStateVariableType,
  TableStateDataType,
  TableStateErrorType,
} from './index';

type MappedStatePropsType = {|
  variable: TableStateVariableType,
  data: TableStateDataType,
  error: TableStateErrorType,
|};
type OwnPropsType = {||};
type PropsType = MappedStatePropsType & OwnPropsType;

type StateType = {|
  shortList: boolean,
|};

class Table extends React.Component<PropsType, StateType> {
  state: StateType = {
    shortList: true,
  };

  componentDidUpdate(prevProps: PropsType) {
    const { variable } = this.props;
    if (prevProps.variable !== variable) this.variableHasChanged();
  }

  getCapitalizedVariable(): ?string {
    const { variable } = this.props;

    if (!variable) return null;

    return variable
      .split(' ')
      .map(word => word.charAt(0)
        .toUpperCase() + word.slice(1))
      .join(' ');
  }

  onFooterClick = (): void => {
    this.setState((state: StateType) => ({
      shortList: !state.shortList,
    }));
  };

  getSlicedRows(): TableStateDataType {
    const { data } = this.props;
    const { shortList } = this.state;

    const shouldBeSliced = shortList && data.length >= 100;

    return shouldBeSliced
      ? data.slice(0, 100)
      : data;
  }

  variableHasChanged() {
    const { shortList } = this.state;

    // reset shortlist to true
    if (!shortList) this.setState({ shortList: true });
  }

  renderColumnsNames(): ?React.Element<Row> {
    const capitalizedVariable = this.getCapitalizedVariable();

    if (!capitalizedVariable) return null;

    return (
      <Row
        index="#"
        variable={capitalizedVariable}
        count="Count"
        averageAge="Average Age"
        isTitle
      />
    );
  }

  renderRows(): Array<React.Element<Row>> {
    const { variable } = this.props;

    return this.getSlicedRows()
      .map((row, index) => (
        <Row
          key={`${row[variable]}${row.count}${row.averageAge}`}
          index={index}
          variable={row[variable]}
          count={row.count}
          averageAge={row.average_age}
        />
      ));
  }

  renderFooter(): ?React.Element<'button'> {
    const { variable, data } = this.props;
    const { shortList } = this.state;

    if (
      !variable // no variable selected
      || !data.length // or no data to show
      || data.length <= 100 // or less than 100 rows
    ) {
      return null;
    }

    const footerTitle = shortList
      ? `Show all rows (${data.length - 100} more)`
      : 'Hide rows';

    return (
      <button
        className="footer"
        type="button"
        onClick={this.onFooterClick}
      >
        {footerTitle}
      </button>
    );
  }

  renderSpinner(): React.Element<Spinner> {
    const { variable, data } = this.props;

    const isOpen = (
      variable // a variable is selected
      && !(data && data.length) // and we have no data to show, yet
    );

    return (
      <Spinner open={isOpen} />
    );
  }

  // ------------------------------------------- Render ------------------------------------------
  render(): React.Element<'div'> {
    const { error } = this.props;
    if (error.data) throw new Error('Data error');

    return (
      <div className="table">
        {this.renderColumnsNames()}

        <div className="rows-container">
          {this.renderRows()}
          {this.renderFooter()}
        </div>

        {this.renderSpinner()}
      </div>
    );
  }
}

const mapStateToProps = (state: TableStateType): MappedStatePropsType => ({
  variable: state.variable,
  data: state.data,
  error: state.error,
});

export default connect(
  mapStateToProps,
  null,
)(Table);
