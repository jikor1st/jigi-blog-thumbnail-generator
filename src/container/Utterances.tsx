import { memo, useEffect, useRef, useState } from 'react';
import { useConditionEffect } from '@/lib/hooks';
import styled from '@emotion/styled';

import { LoadingIndicator } from '@/components';

interface UtterState {
  status: 'pending' | 'failed' | 'success';
}

const Container = styled.div<UtterState>(({ status }) => {
  return {
    '& .utterances': {
      display: status === 'pending' || status === 'failed' ? 'none' : 'block',
    },
  };
});

const LoadingBox = styled.div(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    aspectRatio: '1 / 0.4',
    background: theme.palette.secondary.main,
    borderRadius: 20,
    marginTop: 20,
  };
});

const Loading = () => {
  return (
    <LoadingBox>
      <LoadingIndicator />
    </LoadingBox>
  );
};

export const Utterances = memo(() => {
  const parentElRef = useRef<HTMLDivElement>(null);
  const [utterState, setUtterState] = useState<UtterState>({
    status: 'pending',
  });

  useConditionEffect(
    () => {
      if (parentElRef.current) {
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://utteranc.es/client.js';
        scriptElement.async = true;
        scriptElement.setAttribute(
          'repo',
          'jikor1st/jigi-blog-thumbnail-generator',
        );
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('theme', 'github-dark-orange');
        scriptElement.crossOrigin = 'anonymous';
        parentElRef.current.appendChild(scriptElement);
        scriptElement.onerror = () => setUtterState({ status: 'failed' });
      }

      const counter = setInterval(() => {
        // utterances
        if (!parentElRef.current) return;
        Array.from(parentElRef.current.children).forEach(item => {
          const html = item as HTMLElement;
          if (html.classList.contains('utterances')) {
            Array.from(html.children).map((child, _, arr) => {
              const childHtml = child as HTMLElement;
              if (childHtml.classList.contains('utterances-frame')) {
                setUtterState({ status: 'success' });
                clearTimeout(counter);
              }
            });
          }
        });
      }, 250);

      return () => {
        clearTimeout(counter);
      };
    },
    [],
    { componentDidUpdateCondition: false },
  );

  return (
    <Container ref={parentElRef} status={utterState.status}>
      {utterState.status === 'pending' && <Loading />}
      {utterState.status === 'failed' && <div>failed</div>}
    </Container>
  );
});
