import React from "react";

export type ErrorBoundaryProps = React.PropsWithChildren<{
  handleError?: (_error: Error, _errorInfo: unknown) => void;
  ErrorScreen?: React.ComponentType<{ error: Error }>;
}>;

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown): void {
    this.props.handleError && this.props.handleError(error, errorInfo);
    this.state.error = error;
  }

  render(): React.ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }
    if (!this.props.ErrorScreen) {
      return null;
    }
    const Component = this.props.ErrorScreen;
    return <Component error={this.state.error} />;
  }
}
