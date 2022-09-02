import { useState } from 'react';
import { CanvasView } from '@/container';

import styled from '@emotion/styled';

import { ReactComponent as ArrowDownIcon } from '@/assets/images/icons/icon-arrow-down-gray.svg';
import { GoBack, IconBase, InfoForDevelopment, ButtonBase } from '@/components';
import { useNavigate } from 'react-router-dom';

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

export function SuccessPage() {
  const navigate = useNavigate();

  const handleClickReCreate = () => {
    // Go to Main
    navigate('/');
  };

  const handleClickImgDownload = () => {};
  return (
    <CanvasView
      canvas={<CanvasImage src="" />}
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
