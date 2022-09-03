import React, {
  ComponentProps,
  memo,
  forwardRef,
  MouseEventHandler,
  ReactNode,
} from 'react';
import styled from '@emotion/styled';

import { Modal } from '@/extends-components';
import { IconBase } from '@/components';

import { useBodyScrollLock } from '@/lib/hooks';

const Container = styled.div(({ theme }) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    padding: '0 20px',
  };
});

const ModalWrapper = styled.div(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 520,
    maxHeight: 'calc(100vh - 40px)',
    width: '100%',
    background: theme.palette.background.paper,
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider.secondary}`,
    boxShadow: theme.palette.shadow.modal,
    overflow: 'hidden',
  };
});

const Header = styled.div(({ theme }) => {
  return {
    position: 'relative',
    padding: '12px 20px',
    borderBottom: `1px solid ${theme.palette.divider.secondary}`,
  };
});
const HeadTitle = styled.h2(({ theme }) => {
  return {
    ...theme.typography.h6,
  };
});
const HeadClose = styled.button(() => {
  return {
    position: 'absolute',
    top: '50%',
    right: 12,
    transform: 'translateY(-50%)',
  };
});
const Contents = styled.div(({ theme }) => {
  return {
    flex: 1,
    height: '100%',
    overflow: 'auto',
    padding: '30px 20px',
    ...theme.palette.unstabled_scrollbar,
  };
});

const BottomWrapper = styled.div(({ theme }) => {
  return {
    marginTop: 'auto',
    borderTop: `1px solid ${theme.palette.divider.secondary}`,
  };
});

type ModalProps = ComponentProps<typeof Modal>;

interface BasicModalProps extends ModalProps {
  title: ReactNode | string;
  isOpen?: boolean;
  onClose?: MouseEventHandler;
  bottomContents?: ReactNode;
}

const ComponentDidMount = () => {
  useBodyScrollLock();
  return <></>;
};

export const BasicModal = memo(
  forwardRef<HTMLDivElement, BasicModalProps>(
    (
      { children, title, isOpen = false, onClose, bottomContents, ...props },
      rootRef,
    ) => {
      return (
        <>
          {isOpen && (
            <Modal {...props} ref={rootRef}>
              <ComponentDidMount />
              <Container>
                <ModalWrapper tabIndex={-1}>
                  <Header>
                    <HeadTitle>{title}</HeadTitle>
                    <HeadClose onClick={onClose}>
                      <IconBase icon="Close" />
                    </HeadClose>
                  </Header>
                  <Contents>{children}</Contents>
                  {bottomContents && (
                    <BottomWrapper>{bottomContents}</BottomWrapper>
                  )}
                </ModalWrapper>
              </Container>
            </Modal>
          )}
        </>
      );
    },
  ),
);
