import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { TextField, ButtonBase } from '@/components';

import { CanvasView } from '@/container';

import { useCanvas, useForm } from '@/lib/hooks';

import { BlogThumbnail } from '@/lib/modules';

import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

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
    value: '',
  },
  category: {
    value: '',
  },
  title: {
    value: '',
  },
  contents: {
    value: '',
  },
};

export function MainPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const { formValue, formValidate, handleSetFormValue, handleSetFormValidate } =
    useForm({
      initial: initialValues,
    });

  const ThumbnailRef = useRef(
    new BlogThumbnail<keyof typeof initialValues>(Object.keys(initialValues)),
  );
  const {
    canvasRef,
    ctxRef,
    canvasStageRef,
    registerCanvas,
    registerCanvasContainer,
  } = useCanvas({
    initialOptions: {
      stageRectMethod: 'offset',
      useRequestAnimationFrame: true,
    },
    onCanvasObserver(ctx, { stageWidth, stageHeight }) {
      ThumbnailRef.current.show(ctx, stageWidth, stageHeight);
    },
    onReuqestAnimationFrame(ctx, { stageWidth, stageHeight }) {
      ThumbnailRef.current.show(ctx, stageWidth, stageHeight);
    },
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
      y: 20,
      fontSize: 16,
      textAlign: 'center',
      color: '#cccccc',
    });
  }, [formValue.blogName]);
  useEffect(() => {
    ThumbnailRef.current.update('category', formValue.category, {
      x: canvasStageRef.current.width / 2,
      y: 44,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#808080',
    });
  }, [formValue.category]);
  useEffect(() => {
    ThumbnailRef.current.update('title', formValue.title, {
      x: canvasStageRef.current.width / 2,
      y: canvasStageRef.current.height / 2.2,
      fontSize: canvasStageRef.current.width / 3.4,
      fontWeight: 900,
      color: theme.palette.primary.main,
      textAlign: 'center',
      textBaseline: 'middle',
      lineHeight: `${canvasStageRef.current.width / 3.4}px`,
      multiline: true,
      // maxWidth: canvasStageRef.current.width,
    });
  }, [formValue.title, theme]);
  useEffect(() => {
    ThumbnailRef.current.update('contents', formValue.contents, {
      x: canvasStageRef.current.width / 2,
      y: canvasStageRef.current.height - 22 * 3,
      fontSize: 22,
      textAlign: 'center',
      textBaseline: 'middle',
      lineHeight: '34px',
      multiline: true,
      maxWidth: canvasStageRef.current.width,
    });
  }, [formValue.contents]);

  const handleClickCreateImage = () => {
    if (!canvasRef.current) return;
    try {
      const imageURL = canvasRef.current.toDataURL('image/png');

      navigate('/success', {
        state: {
          title: formValue.title,
          imageURL: imageURL,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CanvasView
      canvasBackgroundRef={registerCanvasContainer}
      canvas={<Canvas ref={registerCanvas} />}
      section={
        <>
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
              multiLine
              onChange={handleChangeTitle}
            />
          </InputWrapper>
          <InputWrapper>
            <TextField
              inputTitle="콘텐츠"
              type="text"
              placeholder="콘텐츠를 입력해주세요"
              value={formValue.contents}
              multiLine
              onChange={handleChangeContents}
            />
          </InputWrapper>
          <InputWrapper>
            <ButtonBase
              variant="filled"
              size="large"
              onClick={handleClickCreateImage}
              fullWidth
            >
              제작하기
            </ButtonBase>
          </InputWrapper>
        </>
      }
    />
  );
}
