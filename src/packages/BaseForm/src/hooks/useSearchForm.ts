/**
 * 搜索表单公共hook
 */
import { computed, ref, Ref, toRaw, unref } from 'vue';
import { FormSchema, FormProps } from '@/components/BaseForm';
import { TableActionType } from '@/components/Table';
import { MenuType } from '@/types/system/menuType';

interface ISearchFormType {
  tableEl?: Ref<TableActionType>;
  schemas: Ref<FormSchema[]>;
}

export function useSearchFrom({ tableEl, schemas }: ISearchFormType) {
  const dictDataObj = ref({});

  /**
   * 设置schemas
   */
  function useSchemas() {
    schemas.value.map((item) => {
      if (item.dictName) {
        item.dictList = dictDataObj.value[item.dictName];
      }
    });
  }

  /**
   * 如果表单中有需要字典，就需要调用此方法
   * @param dictObj
   */
  function setDictDataObj(dictObj: Object) {
    dictDataObj.value = dictObj;
    useSchemas();
  }

  async function searchSubmit(form: MenuType) {
    tableEl?.value?.reload(toRaw(form));
  }

  /**
   * Bind options for form
   */
  const getFormOptions = computed((): FormProps => {
    return {
      inline: true,
      showFeedback: false,
      labelWidth: 'auto',
      labelPlacement: 'left',
      labelAlign: 'left',
      submitButtonText: '搜索',
      schemas: unref(schemas),
    };
  });

  return {
    setDictDataObj,
    getFormOptions,
    useSchemas,
    searchSubmit,
    schemas,
  };
}
