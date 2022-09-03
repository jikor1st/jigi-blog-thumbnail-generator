import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from '@emotion/styled';

import { CanvasView } from '@/container';
import { GoBack, IconBase, InfoForDevelopment, ButtonBase } from '@/components';

const CanvasImage = styled.img(() => {
  return {};
});

const SectionContainer = styled.div(() => {
  return {
    height: '100%',
  };
});
const SectionHeader = styled.div(() => {
  return {
    marginBottom: '72px',
  };
});

const ResultSection = styled.div(() => {
  return {};
});

const Title = styled.h3(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.success.main,
    ...theme.typography.h5,
    columnGap: '12px',
  };
});

const SubTitle = styled.h4(({ theme }) => {
  return {
    marginTop: 20,
    marginBottom: 70,
    color: theme.palette.text.primary,
    ...theme.typography.h6,
  };
});

const ButtonWrapper = styled.div(({ theme }) => {
  return {
    display: 'flex',
    columnGap: '16px',
    marginTop: 40,
  };
});

interface LocationStateType {
  imageURL: string;
  title: String;
}

export function SuccessPage() {
  const navigate = useNavigate();
  const locationState = useLocation().state as LocationStateType;

  const handleClickReCreate = () => {
    // Go to Main
    navigate('/');
  };

  const handleClickImgDownload = () => {
    if (locationState) {
      const { imageURL, title } = locationState;
      const aEl = document.createElement('a');
      aEl.href = imageURL;
      aEl.download = `${title}-thumbnail`;
      aEl.click();
    }
  };
  return (
    <CanvasView
      canvas={
        <>
          {locationState?.imageURL && (
            <CanvasImage src={locationState?.imageURL} />
          )}
        </>
      }
      section={
        <SectionContainer>
          <SectionHeader>
            <GoBack />
          </SectionHeader>
          <ResultSection>
            <Title>
              <IconBase icon="Checked" variant="filled" color="success" />
              제작 성공
            </Title>
            <SubTitle>이미지 제작에 성공했어요!</SubTitle>
            <InfoForDevelopment />
            <ButtonWrapper>
              <ButtonBase
                variant="outlined"
                color="secondary"
                onClick={handleClickReCreate}
              >
                새로 제작하기
              </ButtonBase>
              <ButtonBase
                variant="filled"
                color="primary"
                onClick={handleClickImgDownload}
              >
                이미지 다운로드
              </ButtonBase>
            </ButtonWrapper>
          </ResultSection>
        </SectionContainer>
      }
    />
  );
}
