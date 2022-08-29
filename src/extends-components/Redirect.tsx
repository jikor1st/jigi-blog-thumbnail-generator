import { Navigate, NavigateProps } from 'react-router-dom';

interface RedirectProps extends NavigateProps {
  conditionWith: boolean;
}

export function Redirect({
  to,
  replace = false,
  state = null,
  conditionWith = false,
}: RedirectProps) {
  return (
    <>
      {!conditionWith && <Navigate to={to} replace={replace} state={state} />}
    </>
  );
}
