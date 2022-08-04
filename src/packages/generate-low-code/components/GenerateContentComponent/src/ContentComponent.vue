<script setup lang="ts">
  import { cloneDeep } from 'lodash';
  import { ref, unref, computed, defineProps, defineEmits } from 'vue';
  import Draggable from 'vuedraggable';
  import { NCard, NForm, NFormItem } from 'naive-ui';
  import { draggedProps, formProps } from '../../../config/componentConfig';
  import { contentComponentProps } from './props';
  import { FormSchema } from '@/packages/generate-low-code/types/from';
  import { ComponentType } from '@/packages/generate-low-code/types';

  // 表单绑定
  const formValue = ref({});
  const $emits = defineEmits(['update:draggedComponent']);
  const $props = defineProps(contentComponentProps);

  const getProps = computed(() => {
    return { ...unref($props) };
  });

  /**
   * 画布的拖放/改变/clone 的change事件
   * @param e
   */
  function handleDraggedChange(e) {
    // 如果是add
    if ('added' in e) {
      const {
        added: { element, newIndex },
      } = e;
      const cloneElement = cloneDeep(unref(element)) as FormSchema;
      cloneElement.field = new Date().getTime().toString();
      if (cloneElement.defaultValue) {
        formValue.value[cloneElement.field.toString()] = cloneElement.defaultValue;
      }
      // 通知父组件
      $emits('update:draggedComponent', cloneElement, newIndex);
    }
  }

  /**
   * 调用代表通知此组件需要重新计算formValue
   */
  function setFormValue(): void {
    getProps.value.draggedComponentList.forEach((item) => {
      formValue.value[item.field] = item.defaultValue;
    });
  }

  function inputHandel(e) {
    const component = getProps.value.draggedComponent as FormSchema;
    component.defaultValue = e;
    formValue.value[component.field] = e;
    $emits('update:draggedComponent', component, getProps.value.draggedIndex);
  }

  /**
   * 组件选中事件
   * @param element
   * @param index
   */
  function handleClickCpn(element, index) {
    $emits('update:draggedComponent', element, index);
  }

  /**
   * 获取组件的props
   * @param schema
   * @returns
   */
  function getComponentProps(schema: FormSchema) {
    const cpnProps = schema.componentProps ?? {};
    const component = schema.component;
    return {
      clearable: true,
      disabled: schema.disabled,
      placeholder: schema.placeholder
        ? schema.placeholder
        : createPlaceholderMessage(unref(component)) + schema.label,
      ...cpnProps,
    };
  }

  /**
   * @description: 生成placeholder
   */
  function createPlaceholderMessage(component: ComponentType) {
    if (component === 'NInput') return '请输入';
    if (
      [
        'NPicker',
        'NSelect',
        'NCheckbox',
        'NRadio',
        'NSwitch',
        'NDatePicker',
        'NTimePicker',
      ].includes(component)
    )
      return '请选择';
    return '';
  }

  defineExpose({ setFormValue });
</script>

<template>
  <NCard class="content-component-container h-100">
    <NForm label-placement="top" ref="formElRef" :model="formValue" v-bind="formProps">
      <Draggable
        v-bind="draggedProps"
        :list="getProps.draggedComponentList"
        @change="(e) => handleDraggedChange(e)"
      >
        <template #item="{ element, index }">
          <NFormItem
            :class="[
              element.field === getProps.draggedComponent?.field && 'active-form-item',
              'form-item',
            ]"
            :path="element.field"
            :label="element.label"
            :rule="element.rule"
            @click="handleClickCpn(element, index)"
          >
            <component
              v-model:value="formValue[element.field]"
              :is="element.component"
              @input="() => inputHandel(formValue[element.field])"
              v-bind="getComponentProps(element)"
            >
              <template v-if="element.prefixIcon" #prefix>
                <GIcon :icon="element.prefixIcon" />
              </template>
              <template v-if="element.suffixIcon" #suffix>
                <GIcon :icon="element.suffixIcon" />
              </template>
            </component>
          </NFormItem>
        </template>
      </Draggable>
    </NForm>
  </NCard>
</template>

<style lang="less">
  @import './style/index.less';
</style>
