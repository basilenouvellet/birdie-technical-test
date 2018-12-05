// @flow

import * as React from 'react';

import './Row.css';

type PropsType = {|
    index: number,
    variable: string,
    count: string,
    averageAge: number,
|};

function Row(props: PropsType): React.Element<'div'> {
    const { index, variable, count, averageAge } = props;

    return (
        <div className="row">
            <div className="index">{index}</div>
            <div className="variable">{variable}</div>
            <div className="count">{count}</div>
            <div className="averageAge">{averageAge}</div>
        </div>
    );
}

export default Row;
