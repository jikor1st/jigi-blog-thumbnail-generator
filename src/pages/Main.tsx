import { ChangeEvent, useEffect, useRef, useState, useMemo } from 'react';
import styled from '@emotion/styled';

import { TextField, ButtonBase } from '@/components';

import { CanvasView } from '@/container';

import { useCanvas, useConditionEffect, useForm } from '@/lib/hooks';

import { BlogThumbnail } from '@/lib/modules';

import { useTheme } from '@emotion/react';
import { Location, useLocation, useNavigate } from 'react-router-dom';

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
    marginBottom: '50px',
  };
});

const SectionTitle = styled.h2(({ theme }) => {
  return {
    ...theme.typography.h5,
  };
});

const InputWrapper = styled.div(() => {
  return {
    marginBottom: '40px',
  };
});

interface FormValues {
  blogName: string;
  category: string;
  title: string;
  contents: string;
}

interface CanvasState extends FormValues {
  imageURL: string;
}

interface CanvasLocation {
  state: CanvasState;
}

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
const getStateValues = ({ state }: CanvasLocation) => ({
  blogName: {
    value: state.blogName,
  },
  category: {
    value: state.category,
  },
  title: {
    value: state.title,
  },
  contents: {
    value: state.contents,
  },
});

const hasLocationState = (
  location: CanvasLocation,
): location is CanvasLocation => {
  return (location as CanvasLocation)?.state?.title !== undefined;
};

export function MainPage() {
  const navigate = useNavigate();
  const location = useLocation() as CanvasLocation;
  const theme = useTheme();

  const {
    formValue,
    formValidate,
    formInputRef,
    handleSetFormValue,
    handleSetFormValidate,
    resetFormValidate,
    registerFormInput,
  } = useForm<FormValues>({
    initial: hasLocationState(location)
      ? getStateValues(location)
      : initialValues,
  });

  const ThumbnailRef = useRef(
    new BlogThumbnail<keyof typeof initialValues>(Object.keys(initialValues)),
  );

  const { canvasRef, canvasStageRef, registerCanvas, registerCanvasContainer } =
    useCanvas({
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

  const drawFormCanvas = {
    blogName(value: string) {
      ThumbnailRef.current.update('blogName', value, {
        x: canvasStageRef.current.width / 2,
        y: 20,
        fontSize: 16,
        textAlign: 'center',
        color: '#cccccc',
      });
    },
    category(value: string) {
      ThumbnailRef.current.update('category', value, {
        x: canvasStageRef.current.width / 2,
        y: 44,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#808080',
      });
    },
    title(value: string) {
      ThumbnailRef.current.update('title', value, {
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
    },
    contents(value: string) {
      ThumbnailRef.current.update('contents', value, {
        x: canvasStageRef.current.width / 2,
        y: canvasStageRef.current.height - 22 * 3,
        fontSize: 22,
        textAlign: 'center',
        textBaseline: 'middle',
        lineHeight: '34px',
        multiline: true,
        maxWidth: canvasStageRef.current.width,
      });
    },
  };

  const handleChangeBlogName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    drawFormCanvas.blogName(value);
    handleSetFormValue('blogName', value);
  };
  const handleChangeCategory = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    drawFormCanvas.category(value);
    handleSetFormValue('category', value);
    if (formValidate.category.error) {
      resetFormValidate('category');
    }
  };
  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    drawFormCanvas.title(value);
    handleSetFormValue('title', value);
    if (formValidate.title.error) {
      resetFormValidate('title');
    }
  };
  const handleChangeContents = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    drawFormCanvas.contents(value);
    handleSetFormValue('contents', value);
  };

  useConditionEffect(
    () => {
      if (hasLocationState(location)) {
        const { state } = location;
        drawFormCanvas.blogName(state.blogName);
        drawFormCanvas.category(state.category);
        drawFormCanvas.title(state.title);
        drawFormCanvas.contents(state.contents);
      }
    },
    [],
    {
      componentDidUpdateCondition: false,
    },
  );

  const checkValidate = () => {
    let isValidate = true;
    const formElementList = [];
    if (!formValue.category) {
      handleSetFormValidate('category', {
        error: true,
        message: '카테고리를 입력해주세요.',
      });
      isValidate = false;
      formElementList.push(formInputRef?.current?.category);
    }
    if (!formValue.title) {
      handleSetFormValidate('title', {
        error: true,
        message: '제목을 입력해주세요.',
      });
      formElementList.push(formInputRef?.current?.title);
      isValidate = false;
    }
    if (!isValidate) {
      formElementList[0]?.focus();
    }
    return isValidate;
  };

  const handleClickCreateImage = () => {
    if (!canvasRef.current) return;
    if (!checkValidate()) {
      return;
    }
    try {
      const imageURL = canvasRef.current.toDataURL('image/png');

      navigate('/success', {
        state: {
          ...formValue,
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
              helperText={formValidate.category.message}
              error={formValidate.category.error}
              ref={element =>
                registerFormInput('category', element as HTMLInputElement)
              }
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
              helperText={formValidate.title.message}
              error={formValidate.title.error}
              ref={element =>
                registerFormInput('title', element as HTMLTextAreaElement)
              }
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
