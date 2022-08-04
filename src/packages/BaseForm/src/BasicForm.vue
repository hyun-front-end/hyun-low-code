<script setup lang="ts">
  import { ref, defineProps, computed, unref, Ref, onMounted, reactive } from 'vue';
  import { basicProps } from './props';
  import { FormProps, FormSchema } from './types/from';
  import { DICT_KEY, DICT_LABEL, DICT_VALUE } from './types';
  import { createPlaceholderMessage } from './helper';
  import useFormEvents from './hooks/useFormEvents';
  import { FormActionType } from './types/from';

  const loadingSub = ref(false);
  const formModel = ref<Recordable>({});
  const defaultFormModel = ref<Recordable>({});
  const formElRef = ref<Nullable<FormActionType>>(null);
  const $emit = defineEmits(['submit']);

  const Props: Partial<FormProps> = defineProps({ ...basicProps });

  const getProps = computed(() => {
    return { ...Props } as FormProps;
  });

  const getFormBindValue = computed(() => ({ ...Props }));

  const getSchemas = computed(() => {
    const schemes: FormSchema[] = unref(getProps).schemas as any;
    return schemes as FormSchema[];
  });

  function setLoadingSub(bool: boolean) {
    loadingSub.value = bool;
  }

  function getComponentProps(schema: FormSchema) {
    const cpnProps = schema.componentProps ?? {};
    const component = schema.component;
    return {
      clearable: true,
      placeholder: createPlaceholderMessage(unref(component)) + schema.label,
      ...cpnProps,
    };
  }

  const getSubmitBtnOptions = computed(() => {
    return Object.assign(
      {
        size: Props.size,
        type: 'primary',
      },
      Props.submitButtonOptions
    );
  });

  const getResetBtnOptions = computed(() => {
    return Object.assign(
      {
        size: Props.size,
      },
      Props.resetButtonOptions
    );
  });

  const editorSetting = reactive({
    content: 'hello vue3-tinymce!',
    // editor 配置项
    setting: {
      menubar: false,
      height: 200,
      width: '100%',
      toolbar:
        'bold italic underline h1 h2 blockquote codesample numlist bullist link | removeformat fullscreen| fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
      plugins: 'codesample link image table lists fullscreen',
      toolbar_mode: 'sliding',
      nonbreaking_force_tab: true,
      link_title: false,
      default_link_target: '_blank',
      content_style: 'body{font-size: 16px}',
    },
  });

  /**
   * form event hooks use
   */
  const { handleSubmit, handleReset, validate, clearValidate, setFieldsValue } = useFormEvents({
    $emit,
    formModel,
    getProps,
    getSchemas,
    defaultFormModel,
    formElRef: formElRef as Ref<FormActionType>,
    loadingSub,
  });

  /**
   * 设置默认值
   */
  onMounted(() => {
    if (getProps.value.model) {
      return setFieldsValue(unref(getProps.value.model));
    }
  });

  defineExpose({
    validate,
    setFieldsValue,
    clearValidate,
    setLoadingSub,
  });
</script>

<template>
  <n-form ref="formElRef" v-bind="getFormBindValue" :model="formModel">
    <n-form-item
      v-for="schema in getSchemas"
      v-bind="schema"
      :path="schema.field"
      :key="schema.field"
      v-model:value="formModel[schema.field]"
    >
      <template v-if="schema.component === 'NRadioGroup'">
        <n-radio-group v-model:value="formModel[schema.field]">
          <n-space v-if="schema['dictList']?.length > 0">
            <n-radio
              v-for="dict in schema['dictList']"
              :key="dict[DICT_KEY]"
              :value="dict[DICT_VALUE]"
            >
              {{ dict[DICT_LABEL] }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </template>
      <template v-else-if="schema.component === 'NSelect'">
        <n-select
          v-model:value="formModel[schema.field]"
          :label-field="DICT_LABEL"
          :value-field="DICT_VALUE"
          filterable
          :options="schema['dictList']"
        />
      </template>
      <template v-else-if="schema.component === 'NCheckboxGroup'">
        <n-checkbox-group v-model:value="formModel[schema.field]">
          <n-space>
            <n-checkbox
              v-for="dict in schema['dictList']"
              :key="dict[DICT_KEY]"
              :value="dict[DICT_VALUE]"
              >{{ dict[DICT_LABEL] }}</n-checkbox
            >
          </n-space>
        </n-checkbox-group>
      </template>
      <template v-else-if="schema.component === 'NInputTextArea'"> 123 </template>
      <template v-else-if="schema.component === 'Editor'">
        <vue3-tinymce v-model="formModel[schema.field]" :setting="editorSetting.setting" />
      </template>
      <component
        v-else
        v-bind="getComponentProps(schema)"
        :is="schema.component"
        v-model:value="formModel[schema.field]"
      />
    </n-form-item>
    <!--  操作列  -->
    <n-form-item v-if="getProps.showActionButtonGroup" class="g-form-button-item">
      <div :class="[`--button-group-${getProps.buttonGroupAlign}`, '--button-group-basic']">
        <n-space>
          <n-button
            v-if="getProps.showSubmitButton"
            v-bind="getSubmitBtnOptions"
            @click="handleSubmit"
            :loading="loadingSub"
          >
            {{ getProps.submitButtonText }}
          </n-button>
          <n-button
            v-if="getProps.showResetButton"
            v-bind="getResetBtnOptions"
            @click="handleReset"
            :loading="loadingSub"
          >
            {{ getProps.resetButtonText }}
          </n-button>
        </n-space>
      </div>
    </n-form-item>
  </n-form>
</template>

<style scoped>
  @import './style/index.less';
</style>
