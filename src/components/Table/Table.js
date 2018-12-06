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
  shortList: boolean,
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

  resetShortList() {
    const { shortList } = this.state;
    if (!shortList) this.setState({ shortList: true }); // reset shortlist to true
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

  // ------------------------------------------- Render ------------------------------------------
  render(): React.Element<'div'> {
    const { error, loading } = this.props;
    if (error.data) return <ErrorMessage />;

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
