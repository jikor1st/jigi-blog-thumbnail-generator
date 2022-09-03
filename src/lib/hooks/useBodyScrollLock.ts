import { useEffect, useRef } from 'react';

import { portalUtils } from '../utils';

export const useBodyScrollLock = () => {
  useEffect(() => {
    const portalRoot = portalUtils.getDOM() as HTMLElement;

    if (portalRoot.children.length <= 1) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (!portalRoot.children.length) {
        document.body.style.removeProperty('overflow');
      }
    };
  }, []);
};
