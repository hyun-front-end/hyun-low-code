/* 基础组件 */
import { ref, Ref } from 'vue';
import { FormSchema, FormProps } from '../types/from';

// @ts-ignore
export const baseCpnConfig: Ref<FormSchema[]> = ref([
  {
    field: 'baseInput',
    label: '单行文本',
    icon: 'TabletLandscapeOutline',
    component: 'NInput',
    placeholder: '请输入',
    disabled: false,
    prefixIcon: '',
    suffixIcon: '',
    rule: { required: true, message: '请输入单行文本', trigger: ['change'] },
  },
  {
    field: 'baseNumberInput',
    label: '数字',
    component: 'NInputNumber',
    icon: 'Keyboard12324Regular',
    placeholder: '请输入',
    disabled: false,
    prefixIcon: '',
    suffixIcon: '',
    rule: { type: 'number', required: true, message: '请输入数字', trigger: ['change'] },
  },
  {
    field: 'baseTextareaInput',
    label: '多行文本',
    component: 'NInput',
    icon: 'TabletLandscapeSharp',
    componentProps: {
      type: 'textarea',
    },
    placeholder: '请输入',
    disabled: false,
    rule: { required: true, message: '请输入多行文本', trigger: ['change'] },
  },
]);

export const formValue = ref({});

export const formProps: FormProps = {
  inline: false,
  showFeedback: false,
  labelWidth: 'auto',
  labelAlign: 'left',
  class: 'h-100',
};
export const draggedProps = {
  animation: 200,
  group: 'people',
  disabled: false,
  ghostClass: 'ghost',
  class: 'w-100 h-100',
  'item-key': 'label',
};
