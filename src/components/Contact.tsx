import React, { useState } from 'react';
import { LOGOS, ICONS } from '@/lib/constants';
import styled from '@emotion/styled';

import { IconBase, ModalForDeveloper } from '@/components';

import { v4 } from 'uuid';

const Container = styled.div(() => {
  return {
    textAlign: 'center',
  };
});

const Title = styled.h3(({ theme }) => {
  return {
    color: theme.palette.secondary.main,
    ...theme.typography.body1,
  };
});

const ContactBox = styled.div(() => {
  return {
    display: 'inline-grid',
    gridAutoFlow: 'column',
    gridGap: 12,
    marginTop: 12,
  };
});

const ContactLink = styled.a(() => {
  return {};
});

const ContactButton = styled.button(() => {
  return {};
});

export const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const CONTACT_LIST = [
    {
      type: 'link',
      title: 'jikor1st 깃허브 새창으로',
      href: 'https://github.com/jikor1st',
      icon: <LOGOS.Github />,
    },
    {
      type: 'link',
      title: 'jikor1st 블로그 새창으로',
      href: 'https://jikor1st.tistory.com',
      icon: <LOGOS.Blog />,
    },
    {
      type: 'button',
      title: 'JTBG란 팝업',
      onClick: handleOpen,
      icon: (
        <IconBase icon="Warning" size={48} color="primary" variant="outlined" />
      ),
    },
  ];

  return (
    <>
      <Container>
        <Title>Contact</Title>
        <ContactBox>
          {CONTACT_LIST.map(({ type, title, href, icon, onClick }) => {
            if (type === 'link') {
              return (
                <ContactLink
                  title={title}
                  target={'_blank'}
                  href={href}
                  key={v4()}
                >
                  {icon}
                </ContactLink>
              );
            } else {
              return (
                <ContactButton onClick={onClick} key={v4()}>
                  {icon}
                </ContactButton>
              );
            }
          })}
        </ContactBox>
      </Container>
      <ModalForDeveloper isOpen={showModal} onClose={handleClose} />
    </>
  );
};
