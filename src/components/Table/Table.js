// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import Row from './subComponents/Row';
import Spinner from './subComponents/Spinner';
import ErrorMessage from '../ErrorMessage';

import './Table.css';

import type {
  TableStateType,
  TableStateVariableType,
  TableStateDataType,
  TableStateErrorType,
  TableStateLoadingType,
} from './index';

type MappedStatePropsType = {|
  variable: TableStateVariableType,
  data: TableStateDataType,
  error: TableStateErrorType,
  loading: TableStateLoadingType,
|};
type OwnPropsType = {||};
type PropsType = MappedStatePropsType & OwnPropsType;

type StateType = {|
  shortList: boolean, // do we display only the first 100 rows or not
|};

// export unconnected component for test purposes with Jest
export class TableUnconnected extends React.Component<PropsType, StateType> {
  state: StateType = {
    shortList: true,
  };

  componentDidUpdate(prevProps: PropsType) {
    const { variable } = this.props;
    if (prevProps.variable !== variable) this.resetShortList(); // variable has changed
  }

  getCapitalizedVariable(): ?string {
    const { variable } = this.props;

    if (!variable) return null;

    return variable
      .split(' ')
      .map(word => word.charAt(0)
        .toUpperCase() + word.slice(1)) // capitalize first letter of each word
      .join(' ');
  }

  onFooterClick = (): void => {
    // toggle shortlist
    this.setState((state: StateType) => ({
      shortList: !state.shortList,
    }));
  };

  getSlicedRows(): TableStateDataType {
    const { data } = this.props;
    const { shortList } = this.state;

    // we take only the first 100 rows if
    // - shortlist is true and
    // - if there are more than 100 rows to display
    const shouldBeSliced = shortList && data.length >= 100;

    return shouldBeSliced
      ? data.slice(0, 100)
      : data;
  }

  resetShortList() {
    const { shortList } = this.state;
    // reset shortlist to true (its default value)
    if (!shortList) this.setState({ shortList: true });
  }

  renderColumnsNames(): ?React.Element<Row> {
    const capitalizedVariable = this.getCapitalizedVariable();

    if (!capitalizedVariable) return null; // no variable selected

    // return Title Row
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

    // map rows from data into an array of Row components
    return this.getSlicedRows()
      .map((row, index) => (
        // pass row data to Row component
        <Row
          // try making 'key' unique without using 'index'
          // 'row[variable]' should be unique, but just to be sure we add 'count' and 'averageAge'
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
      return null; // do not display footer
    }

    const footerTitle = shortList
      ? `Show all rows (${data.length - 100} more)` // only the first 100 rows are displayed
      : 'Hide rows'; // all rows are displayed

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

  // ------------------------------------------- Render ------------------------------------------
  render(): React.Element<'div'> {
    const { error, loading } = this.props;
    if (error.data) return <ErrorMessage />; // handle error

    return (
      <div className="table">
        {this.renderColumnsNames()}

        {
          loading ? <Spinner /> : (
            <div className="rows-container">
              {this.renderRows()}
              {this.renderFooter()}
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state: TableStateType): MappedStatePropsType => ({
  variable: state.variable,
  data: state.data,
  error: state.error,
  loading: state.loading,
});

export default connect(
  mapStateToProps,
  null,
)(TableUnconnected);
