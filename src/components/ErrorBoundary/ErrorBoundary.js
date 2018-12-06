// @flow

import * as React from 'react';

import './ErrorBoundary.css';

type OwnPropsType = {||};
type PropsType = OwnPropsType;

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
      const { children } = this.props;
      const { hasError } = this.state;

      if (!hasError) return children;

      return (
        <div className="error-boundary">
            Oops, something went wrong
        </div>
      );
    }
}

export default ErrorBoundary;
