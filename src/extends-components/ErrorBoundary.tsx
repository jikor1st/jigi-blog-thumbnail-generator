import React, { ErrorInfo, ReactNode } from 'react';

//types
type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: (...args: unknown[]) => void;
};

type RenderFallbackType = <ErrorType extends Error>(
  props: RenderFallbackProps<ErrorType>,
) => ReactNode;

interface ErrorBoundaryProps {
  children?: ReactNode;
  onReset?: () => void;
  onError?: (error: Error, info: { componentStack: string }) => void;
  renderFallback: RenderFallbackType;
}
interface ErrorBoundaryState {
  error: Error | null;
}

const inititalState: ErrorBoundaryState = { error: null };

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = inititalState;

  public resetErrorBoundary = () => {
    if (typeof this.props.onReset === 'function') this.props.onReset();
    this.reset();
  };

  public reset() {
    this.setState(inititalState);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error: error };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
    // 에러 캡쳐하기
    console.error('error-boundary capture error:', error, info);
    // Sentry.captureError(error)
  }

  public render() {
    const { error } = this.state;
    const { children, renderFallback } = this.props;

    if (error !== null) {
      return renderFallback({
        error,
        reset: this.resetErrorBoundary,
      });
    }

    return children;
  }
}
