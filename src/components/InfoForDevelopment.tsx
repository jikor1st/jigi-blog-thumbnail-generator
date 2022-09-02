import styled from '@emotion/styled';

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
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  };
});

export const InfoForDevelopment = () => {
  const handleClickOpenPopup = () => {};
  return (
    <Container>
      <Text>
        아직 여러가지 기능들은 개발중에 있어요.
        <br />
        <PopupBtn onClick={handleClickOpenPopup}>이곳</PopupBtn>을 누르면 개발
        될 기능들을 볼 수 있어요.
      </Text>
    </Container>
  );
};
