// @flow

import * as React from 'react';

import './ErrorBoundary.css';

type PropsType = {|
  children: any,
|};

type StateType = {|
  hasError: boolean,
|};

class ErrorBoundary extends React.Component<PropsType, StateType> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  // ------------------------------------------- Render ------------------------------------------
  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div className="error-boundary">
          Oops, something went wrong
        </div>
      );
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export default ErrorBoundary;
