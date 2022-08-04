/**
 * 提交表单公共hook
 */

import { computed, Ref, unref } from 'vue';
import { FormSchema, FormProps } from '@/components/BaseForm';
import { useSearchFrom } from './useSearchForm';

interface IFormType {
  schemas: Ref<FormSchema[]>;
  formProps?: Partial<FormProps>;
  rules?: object | object[];
}

export function useForm({ schemas, rules, formProps }: IFormType) {
  /**
   * 引用searchForm的 设置字典和 schemas hook
   */
  const { setDictDataObj, schemas: finalSchemas } = useSearchFrom({ schemas: schemas });

  const getFormOptions = computed((): FormProps => {
    return {
      inline: false,
      labelPlacement: 'left',
      resetButtonText: '取消',
      rules: rules,
      schemas: unref(finalSchemas),
      ...formProps,
    };
  });

  return {
    setDictDataObj,
    getFormOptions,
  };
}
