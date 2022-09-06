// useForm.ts
import { useState, useCallback, useRef, Ref } from 'react';

type UseFormReturnType<FormValuesProps> = {
  // TODO: any 타입 설정 필요
  formValue: FormValuesType<FormValuesProps>;
  formValidate: FormValidateType<FormValuesProps>;
  formCertificate: FormCertificateType<FormValuesProps>;
  formInputRef: { current: FormRefsType<FormValuesProps> };
  registerFormInput: (
    formName: keyof FormValuesProps,
    element?: HTMLInputElement | HTMLTextAreaElement,
  ) => void;
  handleSetFormValue: (
    formName: keyof FormValuesProps,
    changeValue: any,
  ) => void;
  handleSetFormValidate: (
    formName: keyof FormValuesProps,
    validateObject: FormValidateObjectType,
  ) => void;
  handleSetFormCertificate: (
    formName: keyof FormValuesProps,
    certificatePromiseFunction: () => Promise<boolean>,
    resultCertificateCallback: (options: ResultCertificateCallbackType) => void,
  ) => void;
  resetAllFormValue: () => void;
  resetFormValidate: (formName: keyof FormValuesProps) => void;
  resetFormCertificate: (formName: keyof FormValuesProps) => void;
};

type UseFormProps<FormValuesProps> = {
  initial: FormInitialType<FormValuesProps>;
};
type FormInitialType<FormValuesProps> = {
  [PropertyKey in keyof FormValuesProps]: {
    value: FormValuesProps[PropertyKey];
    validate?: {
      error: boolean;
      message?: string;
    };
    certificate?:
      | boolean
      | {
          pass?: boolean;
          loading?: boolean;
        };
  };
};

type FormValuesType<FormValuesProps> = {
  [PropertyKey in keyof FormValuesProps]: FormValuesProps[PropertyKey];
};
type FormRefsType<FormValuesProps> = {
  [PropertyKey in keyof FormValuesProps]:
    | HTMLInputElement
    | HTMLTextAreaElement
    | null;
};

type FormValidateObjectType = {
  error: boolean;
  message: string;
};

type FormValidateType<FormValuesProps> = {
  [Property in keyof FormValuesProps]: FormValidateObjectType;
};

type FormCertificateObjectType = {
  pass: boolean;
  loading?: boolean;
};

type FormCertificateType<FormValuesProps> = {
  [Property in keyof FormValuesProps]: FormCertificateObjectType;
};

type ResultCertificateCallbackType = {
  fetchSuccess: boolean;
  isCertificate: boolean;
};

function createInitialValues<FormValuesProps>(
  initial: FormInitialType<FormValuesProps>,
) {
  // TODO : any 타입 수정 필요
  const resultInitialFormValue: any = {};
  Object.entries(initial).forEach(([initialFormKey, initialFormValues]) => {
    // TODO : value type 에러 수정 필요
    const { value } = initialFormValues as { value: FormValuesProps };
    resultInitialFormValue[initialFormKey] = value;
  });
  return resultInitialFormValue as FormValuesType<FormValuesProps>;
}
function createInitialRefs<FormValuesProps>(
  initial: FormInitialType<FormValuesProps>,
) {
  // TODO : any 타입 수정 필요
  const resultInitialFormRefs: any = {};
  Object.entries(initial).forEach(([initialFormKey]) => {
    // TODO : value type 에러 수정 필요
    resultInitialFormRefs[initialFormKey] = null;
  });
  return resultInitialFormRefs as FormRefsType<FormValuesProps>;
}

function createInitialValidate<FormValuesProps>(
  initial: FormInitialType<FormValuesProps>,
) {
  const resultInitialFormValidate: {
    [key: string]: FormValidateObjectType;
  } = {};

  Object.entries(initial).forEach(([initialFormKey, initialFormValues]) => {
    const { validate } =
      (initialFormValues as { validate: FormValidateObjectType }) ?? {};
    resultInitialFormValidate[initialFormKey] = {
      error: validate?.error ?? false,
      message: validate?.message ?? '',
    };
  });

  return resultInitialFormValidate as FormValidateType<FormValuesProps>;
}

function certificateObject({
  pass = false,
  loading = false,
}: FormCertificateObjectType) {
  return {
    pass: pass,
    loading: loading,
  };
}

function createInitialCertificate<FormValuesProps>(
  initial: FormInitialType<FormValuesProps>,
) {
  const resultInitialFormCertificate: {
    [key: string]: FormCertificateObjectType;
  } = {};

  Object.entries(initial)?.forEach(([initialFormKey, initialFormValues]) => {
    const { certificate } =
      (initialFormValues as { certificate: FormCertificateObjectType }) ?? {};
    if (typeof certificate === 'boolean') {
      resultInitialFormCertificate[initialFormKey] = certificateObject({
        pass: certificate,
      });
    } else if (typeof certificate === 'object') {
      const { pass, loading } = certificate ?? {};
      resultInitialFormCertificate[initialFormKey] = certificateObject({
        pass: pass ?? false,
        loading: loading ?? false,
      });
    }
  });

  return resultInitialFormCertificate as FormCertificateType<FormValuesProps>;
}

export function useForm<FormValuesProps>({
  initial,
}: UseFormProps<FormValuesProps>): UseFormReturnType<FormValuesProps> {
  const [formValue, setFormValue] = useState<FormValuesType<FormValuesProps>>(
    createInitialValues<FormValuesProps>(initial),
  );

  const [formValidate, setFormValidate] = useState<
    FormValidateType<FormValuesProps>
  >(createInitialValidate<FormValuesProps>(initial));

  const [formCertificate, setFormCertificate] = useState<
    FormCertificateType<FormValuesProps>
  >(createInitialCertificate<FormValuesProps>(initial));

  const formInputRef = useRef<FormRefsType<FormValuesProps>>(
    createInitialRefs<FormValuesProps>(initial),
  );

  function registerFormInput(
    formName: keyof FormValuesProps,
    element?: HTMLInputElement | HTMLTextAreaElement | null,
  ) {
    if (!element) return;
    formInputRef.current[formName] = element;
  }

  const handleSetFormValue = useCallback(
    (formName: keyof FormValuesProps, changeValue: FormValuesProps) => {
      setFormValue(prev => ({
        ...prev,
        [formName]: changeValue,
      }));
    },
    [formValue],
  );

  const resetAllFormValue = useCallback(() => {
    setFormValue(createInitialValues<FormValuesProps>(initial));
  }, []);

  const handleSetFormValidate = useCallback(
    (
      formName: keyof FormValuesProps,
      { error, message }: FormValidateObjectType,
    ) => {
      setFormValidate(prev => ({
        ...prev,
        [formName]: { error: error, message: message },
      }));
    },
    [formValidate],
  );

  const resetFormValidate = useCallback(
    (formName: keyof FormValuesProps) => {
      setFormValidate(prev => ({
        ...prev,
        [formName]: { error: false, message: '' },
      }));
    },
    [formValidate],
  );

  const handleSetFormCertificate = useCallback(
    async (
      formName: keyof FormValuesProps,
      certificatePromiseFunction: () => Promise<boolean>,
      resultCertificateCallback?: ({
        fetchSuccess,
        isCertificate,
      }: ResultCertificateCallbackType) => void,
    ) => {
      if (formCertificate[formName].loading) return undefined;
      setFormCertificate(prev => ({
        ...prev,
        [formName]: { pass: false, loading: true },
      }));

      let isCertificate = false;
      let fetchSuccess = true;
      try {
        isCertificate = await certificatePromiseFunction();
      } catch {
        fetchSuccess = false;
      } finally {
        setFormCertificate(prev => ({
          ...prev,
          [formName]: {
            pass: isCertificate,
            loading: false,
          },
        }));
        if (typeof resultCertificateCallback === 'function') {
          resultCertificateCallback({
            fetchSuccess: fetchSuccess,
            isCertificate: isCertificate,
          });
        }
      }
    },
    [formCertificate],
  );

  const resetFormCertificate = useCallback(
    (formName: keyof FormValuesProps) => {
      setFormCertificate(prev => ({
        ...prev,
        [formName]: { pass: false, loading: false },
      }));
    },
    [formCertificate],
  );

  return {
    formValue,
    formValidate,
    formCertificate,
    formInputRef,
    registerFormInput,
    handleSetFormValue,
    resetAllFormValue,
    handleSetFormValidate,
    resetFormValidate,
    handleSetFormCertificate,
    resetFormCertificate,
  };
}

export type {
  UseFormReturnType,
  FormValidateObjectType,
  FormValidateType,
  ResultCertificateCallbackType,
};
