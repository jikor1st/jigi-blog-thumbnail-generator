import React from 'react';

// routers
import { Routes, Route, NavLink } from 'react-router-dom';

// constants
import { PAGE_ROUTES } from '@/lib/constants';

import { AsyncBoundary } from '@/extends-components';

function App() {
  return (
    <>
      <div>
        <NavLink to={'/'}>메인</NavLink>
        <NavLink to={'/success'}>성공</NavLink>
        <NavLink to={'failed'}>실패</NavLink>
      </div>
      <Routes>
        {PAGE_ROUTES.map(({ path, page, name }) => (
          <Route
            path={path}
            element={
              <AsyncBoundary
                pendingFallback={<div>로딩</div>}
                rejectedFallback={() => <div>에러 감지</div>}
              >
                {React.createElement(page)}
              </AsyncBoundary>
            }
            key={path}
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
