import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';

import { BasicModal, Utterances } from '@/container';

import { v4 } from 'uuid';
import { IconBase } from './IconBase';

interface ModalForDeveloperProps {
  isOpen: boolean;
  onClose: MouseEventHandler;
}

const Article = styled.article(() => {
  return {
    '&:not(:last-child)': {
      marginBottom: 60,
    },
  };
});

const Title = styled.h3(({ theme }) => {
  return {
    marginBottom: 12,
    ...theme.typography.h6,
  };
});
const Text = styled.p(({ theme }) => {
  return {
    ...theme.typography.body1,
  };
});
const Info = styled.p(({ theme }) => {
  return {
    display: 'inline-grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    gridGap: 4,
    color: theme.palette.text.secondary,
    ...theme.typography.body2,
  };
});

const DEVELOP_LIST = [
  '백그라운드 색상 및 이미지 첨부 기능을 제공할 것입니다.',
  '폰트의 사이즈/행간/자간/색상/폰트 패밀리와 같은 폰트 수정을 할 수 있는 UI를 제공할 것입니다.',
  '각 콘텐츠의 위치를 수정할 수 있도록 UI를 제공할 것입니다.',
  '만든 썸네일의 레이아웃을 다음에도 사용할 수 있도록 저장 기능을 제공할 것입니다.',
  '썸네일의 사이즈를 수정할 수 있도록 UI를 제공할 것입니다.',
  '라이트 모드와 다크 모드를 지원할 계획입니다.',
  '다국어를 지원할 계획입니다. (계획은 영어와 한국어까지)',
];

export const ModalForDeveloper = ({
  isOpen,
  onClose,
}: ModalForDeveloperProps) => {
  return (
    <BasicModal
      title={'JTBG는 개발중!'}
      isOpen={isOpen}
      onClose={onClose}
      dimmed
      maxHeight={500}
    >
      <section>
        <Article>
          <Title>JTBG란?</Title>
          <Text>
            Jigi Blog Thumbnail Generator로 해당 서비스 개발자의 별명 중 Jigi로
            시작해서 블로그 썸네일 생성기라는 프로젝트의 이름 앞 이니셜을 딴
            제목입니다.
          </Text>
        </Article>
        <Article>
          <Title>앞으로 어떤것이 개발될 건가요?</Title>
          <ul>
            {DEVELOP_LIST.map(str => {
              return (
                <li key={v4()}>
                  <Text>- {str}</Text>
                </li>
              );
            })}
          </ul>
        </Article>
        <Article>
          <Title>여러분들의 아이디어가 필요해요!</Title>
          <Text>다양한 여러분들의 아이디어를 댓글로 남겨주세요!</Text>
          <Info>
            <IconBase
              icon="Warning"
              size={18}
              variant="outlined"
              color={'secondary'}
            />{' '}
            댓글을 남기기 위해서는 깃허브 아이디가 필요합니다
          </Info>
          <Utterances />
        </Article>
      </section>
    </BasicModal>
  );
};
