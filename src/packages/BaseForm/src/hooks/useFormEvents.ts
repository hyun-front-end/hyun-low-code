import { ComputedRef, Ref, toRaw, unref } from 'vue';
import { FormProps, FormSchema, FormActionType } from '../types/from';
import { isFunction } from '@/utils/is';

declare type EmitType = (event: string, ...args: any[]) => void;

export interface IUseFormActionContext {
  $emit: EmitType;
  formModel: Recordable;
  getProps: ComputedRef<FormProps>;
  getSchemas: ComputedRef<FormSchema[]>;
  formElRef: Ref<FormActionType>;
  loadingSub: Ref<boolean>;
  defaultFormModel: Recordable;
  handleFormValues?: Function;
}

export default function useFormEvents({
  $emit,
  formModel,
  getProps,
  formElRef,
  getSchemas,
  defaultFormModel,
  handleFormValues,
}: IUseFormActionContext) {
  // 验证
  async function validate() {
    return unref(formElRef)?.validate();
  }

  //清空校验
  async function clearValidate() {
    try {
      await unref(formElRef)?.clearValidate();
    } catch (e) {}
  }

  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault();
    const { submitFunc } = unref(getProps);
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      return;
    }
    const formEl = unref(formElRef);
    if (!formEl) return;
    try {
      await validate();
      $emit('submit', formModel.value);
    } catch (error) {
      console.info(error);
    }
  }

  async function handleReset(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getProps);
    resetFunc && isFunction(resetFunc) && (await resetFunc());

    const formEl = unref(formElRef);
    if (!formEl) return;
    Object.keys(formModel.value).forEach((key) => {
      formModel.value[key] = unref(defaultFormModel)[key] || null;
    });
    await clearValidate();
    const fromValues = handleFormValues && handleFormValues(toRaw(unref(formModel)));
    $emit('reset', fromValues);
    submitOnReset && (await handleSubmit());
  }

  //设置表单字段值
  async function setFieldsValue(values: Recordable): Promise<void> {
    console.log(values);
    const fields = unref(getSchemas)
      .map((item) => item.field)
      .filter(Boolean);
    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (fields.includes(key)) {
        formModel.value[key] = value;
      }
    });
  }

  return {
    validate,
    clearValidate,
    handleReset,
    setFieldsValue,
    handleSubmit,
  };
}
