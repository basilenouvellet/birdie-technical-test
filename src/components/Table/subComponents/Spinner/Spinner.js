// @flow

import * as React from 'react';

import './Spinner.css';

type OwnPropsType = {|
    open: boolean,
|};
type PropsType = OwnPropsType;

function Spinner(props: PropsType): React.Element<'div'> {
    const { open } = props;

    return !open ? null : (
        <div className="spinner">
            <div className="sk-cube1 sk-cube"/>
            <div className="sk-cube2 sk-cube"/>
            <div className="sk-cube4 sk-cube"/>
            <div className="sk-cube3 sk-cube"/>
        </div>
    );
}

export default Spinner;
