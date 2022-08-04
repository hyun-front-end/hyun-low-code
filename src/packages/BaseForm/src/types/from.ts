import { ComponentType } from './index';
import { ButtonProps } from 'naive-ui/lib/button';
import { CSSProperties } from 'vue';
import { DictType } from '@/types/system/dictType';

type buttonGroupAlignType = 'left' | 'right' | 'center';

type ruleType = {
  required: boolean;
  message: string;
  trigger: string | string[];
};

export interface FormSchema {
  field: string;
  label: string;
  type?: string;
  labelMessage?: string;
  labelMessageStyle?: object | string;
  defaultValue?: any;
  component: ComponentType;
  componentProps?: object;
  slot?: string;
  rule?: ruleType | ruleType[];
  isFull?: boolean;
  suffix?: string;
  dictName?: string;
  dictList?: DictType[];
}

export interface FormProps {
  model?: Recordable;
  labelWidth?: number | string;
  schemas?: FormSchema[];
  inline: boolean;
  layout?: string;
  labelAlign?: string;
  size?: string;
  rules?: object | object[];
  labelPlacement: string;
  isFull?: boolean;
  buttonGroupAlign?: buttonGroupAlignType;
  showFeedback?: boolean;
  showActionButtonGroup?: boolean;
  showResetButton?: boolean;
  resetButtonOptions?: Partial<ButtonProps>;
  showSubmitButton?: boolean;
  showAdvancedButton?: boolean;
  submitButtonOptions?: Partial<ButtonProps>;
  submitButtonText?: string;
  resetButtonText?: string;
  resetFunc?: () => Promise<void>;
  submitFunc?: () => Promise<void>;
  submitOnReset?: boolean;
  baseGridStyle?: CSSProperties;
}

export interface FormActionType {
  submit: () => Promise<any>;
  setLoadingSub: (bool: Boolean) => void;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  setFieldsValue: <T>(values: T) => Promise<void>;
  clearValidate: (name?: string | string[]) => Promise<void>;
  getFieldsValue: () => Recordable;
  resetFields: () => Promise<void>;
  validate: (nameList?: any[]) => Promise<any>;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
