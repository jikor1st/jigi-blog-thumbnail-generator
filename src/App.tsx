import React from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { v4 } from 'uuid';

// routers
import { Routes, Route, NavLink } from 'react-router-dom';

// constants
import { PAGE_ROUTES } from '@/lib/constants';

import { AsyncBoundary } from '@/extends-components';

import { PageLoading } from '@/components';

import { PageLayout } from '@/container';

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
                rejectedFallback={() => <div>에러 감지</div>}
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
    </>
  );
}

export default App;
