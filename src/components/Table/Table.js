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

class Table extends React.Component<PropsType> {
    getCapitalizedVariable(): string {
        const { variable } = this.props;

        if (!variable) return null;

        return variable
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

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

        return data.map((row, index) => (
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

        if (!variable || !data.length) return null;

        return (
            <div className="footer">Footer goes here, 232 results not shown</div>
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
                {this.renderRows()}
                {this.renderFooter()}
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
