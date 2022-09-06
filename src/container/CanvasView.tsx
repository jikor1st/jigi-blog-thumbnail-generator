import { memo, ReactElement, Ref } from 'react';
import styled from '@emotion/styled';
import { Contact } from '@/components';

const Container = styled.div(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  };
});

const CanvasSection = styled.section(({ theme }) => {
  return {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    fontSize: 0,
    padding: 40,
    background: theme.palette.background.canvas,
  };
});

const CanvasBackground = styled.div(({ theme }) => {
  return {
    position: 'relative',
    width: '100%',
    maxWidth: 600,
    aspectRatio: '1 / 1',
    background: theme.palette.background.paper,
    border: '1px solid',
    borderColor: theme.palette.divider.secondary,
  };
});

const FormSection = styled.section(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    borderLeft: `1px solid ${theme.palette.divider.secondary}`,
    background: theme.palette.background.paper,
    maxHeight: '100vh',
    overflow: 'auto',
    [theme.breakpoints.down('lg')]: {
      maxHeight: 'unset',
    },
  };
});

const FormWrapper = styled.div(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '54px 80px',
    [theme.breakpoints.down('sm')]: {
      padding: '24px 20px',
    },
  };
});

const ContactWrapper = styled.div(() => {
  return {
    marginTop: 'auto',
  };
});

interface CanvasViewProps {
  canvasBackgroundRef?: Ref<HTMLDivElement>;
  canvas: ReactElement;
  section: ReactElement;
}
export const CanvasView: React.FC<CanvasViewProps> = memo(
  ({ canvas, canvasBackgroundRef, section }) => {
    return (
      <Container>
        <CanvasSection>
          <CanvasBackground ref={canvasBackgroundRef}>
            {canvas}
          </CanvasBackground>
        </CanvasSection>
        <FormSection>
          <FormWrapper>
            {section}
            <ContactWrapper>
              <Contact />
            </ContactWrapper>
          </FormWrapper>
        </FormSection>
      </Container>
    );
  },
);
