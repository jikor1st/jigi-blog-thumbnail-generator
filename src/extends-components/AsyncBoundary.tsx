import React, { Suspense } from 'react';

// meta-components
import { ErrorBoundary } from '@/extends-components';

// types
type ErrorBoundaryProps = React.ComponentProps<typeof ErrorBoundary>;

interface AsyncBoundaryProps
  extends Omit<ErrorBoundaryProps, 'renderFallback'> {
  pendingFallback: React.ComponentProps<typeof Suspense>['fallback'];
  rejectedFallback: ErrorBoundaryProps['renderFallback'];
}

export function AsyncBoundary({
  children,
  rejectedFallback,
  pendingFallback,
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary renderFallback={rejectedFallback}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
