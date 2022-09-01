import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { TextField } from '@/components';

import { useCanvas, useForm, useConditionEffect } from '@/lib/hooks';

import { BlogThumbnail } from '@/lib/modules';

const Container = styled.main(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };
});
const Wrapper = styled.div(({ theme }) => {
  return {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
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

const Canvas = styled.canvas(({ theme }) => {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  };
});

const FormSection = styled.section(({ theme }) => {
  return {
    flex: '0 0 556px',
    borderLeft: `1px solid ${theme.palette.divider.secondary}`,
    background: theme.palette.background.paper,
  };
});

const FormWrapper = styled.div(() => {
  return {
    padding: '54px 80px',
  };
});

const SectionHeader = styled.div(() => {
  return {
    marginBottom: '72px',
  };
});

const SectionTitle = styled.h2(({ theme }) => {
  return {
    ...theme.typography.h5,
  };
});

const InputWrapper = styled.div(() => {
  return {
    marginBottom: '54px',
  };
});

const initialValues = {
  blogName: {
    value: 'ㄱ부터ㅎ까지',
  },
  category: {
    value: '자바스크립트',
  },
  title: {
    value: 'this란 무엇일까?',
  },
  contents: {
    value: 'this는 자기 자신을 참조하는 동적 변수입니다.',
  },
};

export function MainPage() {
  const ThumbnailRef = useRef(
    new BlogThumbnail<keyof typeof initialValues>(Object.keys(initialValues)),
  );
  const { ctxRef, canvasStageRef, registerCanvas, registerCanvasContainer } =
    useCanvas({
      initialOptions: {
        stageRectMethod: 'offset',
        useRequestAnimationFrame: true,
      },
      onCanvasObserver(ctx) {
        ThumbnailRef.current.show(ctx);
      },
      onReuqestAnimationFrame(ctx, options) {
        const { stageWidth, stageHeight } = options;
        ctx.clearRect(0, 0, stageWidth, stageHeight);
        ThumbnailRef.current.show(ctx);
      },
    });

  const { formValue, formValidate, handleSetFormValue, handleSetFormValidate } =
    useForm({
      initial: initialValues,
    });

  const handleChangeBlogName = (event: ChangeEvent<HTMLInputElement>) =>
    handleSetFormValue('blogName', event.target.value);
  const handleChangeCategory = (event: ChangeEvent<HTMLInputElement>) =>
    handleSetFormValue('category', event.target.value);
  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) =>
    handleSetFormValue('title', event.target.value);
  const handleChangeContents = (event: ChangeEvent<HTMLInputElement>) =>
    handleSetFormValue('contents', event.target.value);

  useEffect(() => {
    ThumbnailRef.current.update('blogName', formValue.blogName, {
      x: canvasStageRef.current.width / 2,
      y: 20 + 16,
      fontSize: 16,
      textAlign: 'center',
      color: '#cccccc',
    });
  }, [formValue.blogName]);
  useEffect(() => {
    ThumbnailRef.current.update('category', formValue.category, {
      x: canvasStageRef.current.width / 2,
      y: 20 + 16 + 8 + 16,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#a2a2a2cc',
    });
  }, [formValue.category]);
  useEffect(() => {
    ThumbnailRef.current.update('title', formValue.title, {
      x: canvasStageRef.current.width / 2,
      y: 20 + 16 + 16 + 8 + 120,
      fontSize: 120,
      textAlign: 'center',
      // maxWidth: canvasStageRef.current.width,
    });
  }, [formValue.title]);
  useEffect(() => {
    ThumbnailRef.current.update('contents', formValue.contents, {
      x: canvasStageRef.current.width / 2,
      y: 20 + 16 + 16 + 120 + 8 + 26,
      fontSize: 25,
      textAlign: 'center',
    });
  }, [formValue.contents]);

  return (
    <Container>
      <Wrapper>
        <CanvasSection>
          <CanvasBackground ref={registerCanvasContainer}>
            <Canvas ref={registerCanvas} />
          </CanvasBackground>
        </CanvasSection>
        <FormSection>
          <FormWrapper>
            <SectionHeader>
              <SectionTitle>정보를 기입해주세요</SectionTitle>
            </SectionHeader>
            <InputWrapper>
              <TextField
                inputTitle="블로그 이름"
                type="text"
                placeholder="블로그 이름을 입력해주세요"
                value={formValue.blogName}
                onChange={handleChangeBlogName}
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                inputTitle="카테고리"
                type="text"
                placeholder="카테고리를 입력해주세요"
                value={formValue.category}
                onChange={handleChangeCategory}
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                inputTitle="제목"
                type="text"
                placeholder="제목을 입력해주세요"
                value={formValue.title}
                onChange={handleChangeTitle}
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                inputTitle="콘텐츠"
                type="text"
                placeholder="콘텐츠를 입력해주세요"
                value={formValue.contents}
                onChange={handleChangeContents}
              />
            </InputWrapper>
          </FormWrapper>
        </FormSection>
      </Wrapper>
    </Container>
  );
}
