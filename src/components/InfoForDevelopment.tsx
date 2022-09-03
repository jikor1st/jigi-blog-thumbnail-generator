import styled from '@emotion/styled';

import { ModalForDeveloper } from '@/components';
import { useState } from 'react';

const Container = styled.div(() => {
  return {};
});

const Text = styled.div(({ theme }) => {
  return {
    color: theme.palette.text.primary,
    ...theme.typography.body1,
  };
});

const PopupBtn = styled.span(({ theme }) => {
  return {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  };
});

export const InfoForDevelopment = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <>
      <Container>
        <Text>
          아직 여러가지 기능들은 개발중에 있어요.
          <br />
          <PopupBtn onClick={handleOpen}>이곳</PopupBtn>을 누르면 개발 될
          기능들을 볼 수 있어요.
        </Text>
      </Container>
      <ModalForDeveloper isOpen={showModal} onClose={handleClose} />
    </>
  );
};
