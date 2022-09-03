import styled from '@emotion/styled';
import React, { useEffect, useRef, ReactNode, Ref, forwardRef } from 'react';
import { createPortal } from 'react-dom';

import { portalUtils } from '@/lib/utils';

interface PortalProps {
  children?: ReactNode;
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ children }, rootRef) => {
    const el = useRef(document.createElement('div'));

    useEffect(() => {
      // Use this in case CRA throws an error about react-hooks/exhaustive-deps
      const current = el.current;
      rootRef = el;

      const portalRoot = portalUtils.getDOM() as HTMLElement;
      // We assume `portalRoot` exists with '!'
      portalRoot!.appendChild(current);

      return () => {
        rootRef = null;
        void portalRoot!.removeChild(current);
      };
    }, []);

    return createPortal(children, el.current);
  },
);
