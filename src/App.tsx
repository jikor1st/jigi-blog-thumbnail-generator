import React from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { v4 } from 'uuid';

// routers
import { Routes, Route, NavLink } from 'react-router-dom';

// constants
import { PAGE_ROUTES } from '@/lib/constants';

import { AsyncBoundary, PortalRoot } from '@/extends-components';

import { PageLoading } from '@/components';

import { PageLayout, ErrorView } from '@/container';

function App() {
  return (
    <>
      {/* <div>
        <NavLink to={'/'}>메인</NavLink>
        <NavLink to={'success'}>성공</NavLink>
        <NavLink to={'failed'}>실패</NavLink>
      </div> */}

      <Routes>
        {PAGE_ROUTES.map(({ path, page, name }) => (
          <Route
            path={path}
            element={
              // <TransitionGroup>
              //   <CSSTransition key={v4()} timeout={250} classNames="fade">
              <AsyncBoundary
                pendingFallback={<PageLoading />}
                rejectedFallback={({ error, reset }) => {
                  const errorCode = error?.code ?? 'Warning';
                  return (
                    <ErrorView
                      errorCode={errorCode}
                      errorMessage={error.message}
                      onResetError={() => reset()}
                    />
                  );
                }}
              >
                <PageLayout>{React.createElement(page)}</PageLayout>
              </AsyncBoundary>
              //   </CSSTransition>
              // </TransitionGroup>
            }
            key={path}
          />
        ))}
      </Routes>
      <PortalRoot />
    </>
  );
}

export default App;
