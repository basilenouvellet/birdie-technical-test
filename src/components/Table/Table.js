// @flow

import * as React from 'react';
import { connect } from 'react-redux';

import { TableActions } from './index';
import Row from './subComponents/Row';
import Spinner from './subComponents/Spinner';

import type { AppStateType } from '../../rootReducer';      // TODO: Is it the RIGHT PATH?

import './Table.css';

type MappedStatePropsType = {||};
type MappedDispatchPropsType = {||};
type OwnPropsType = {||};
type PropsType = MappedStatePropsType & MappedDispatchPropsType & OwnPropsType;

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

    variableHasChanged() {
        const { shortList } = this.state;

        // reset shortlist to true
        if (!shortList) this.setState({ shortList: true });
    }

    getCapitalizedVariable(): string {
        const { variable } = this.props;

        if (!variable) return null;

        return variable
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    onFooterClick = () => {
        this.setState(state => ({
            shortList: !state.shortList,
        }));
    };

    renderColumnsNames() {
        const capitalizedVariable = this.getCapitalizedVariable();

        if (!capitalizedVariable) return null;

        return (
            <Row
                index='#'
                variable={capitalizedVariable}
                count='Count'
                averageAge='Average Age'
                isTitle
            />
        );
    }

    renderRows() {
        const { variable, data } = this.props;
        const { shortList } = this.state;

        return data
            .slice(0, shortList && data.length >= 100
                ? 100
                : data.length)
            .map((row, index) => (
                <Row
                    key={`${row[variable]}${index}${row.count}`}
                    index={index}
                    variable={row[variable]}
                    count={row.count}
                    averageAge={row.average_age}
                />
            ));
    }

    renderFooter() {
        const { variable, data } = this.props;
        const { shortList } = this.state;

        if (
            !variable // no variable selected
            || !data.length // or no data to show
            || data.length <= 100 // or less than 100 rows
        ) return null;

        return (
            <div
                className="footer"
                onClick={this.onFooterClick}
            >
                {
                    shortList
                        ? `Show ${data.length - 100} more`
                        : 'Hide rows'
                }
            </div>
        );
    }

    renderSpinner() {
        const { variable, data } = this.props;

        const isOpen = (
            (
                variable // a variable is selected
                && !(data && data.length) // and we have no data to show, yet
            )
            // TODO: or variable not according to data
        );

        return (
            <Spinner open={isOpen}/>
        );
    }

    // ------------------------------------------- Render ------------------------------------------
    render() {
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

const mapStateToProps = (state: AppStateType): MappedStatePropsType => ({
    columns: state.columns,
    variable: state.variable,
    data: state.data,
});

const mapDispatchToProps = (dispatch: *): MappedDispatchPropsType => ({
    fetchData: (variable) => {
        dispatch(TableActions.fetchDataAction(variable));
    },
    fetchColumns: () => {
        dispatch(TableActions.fetchColumnsAction());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Table);
