<script setup lang="ts">
  import { ref, PropType, unref, computed } from 'vue';
  import { NCard, NForm, NFormItem, NInput, NInputGroup } from 'naive-ui';
  import { IconSelectionModal } from '../RightIconSelectionModal';
  import { FormSchema } from '@/views/generate-low-code/types/from';
  import { isEmpty, cloneDeep, isArray } from 'lodash';

  const $emits = defineEmits(['update:rightSetDraggedComponent']);
  const $props = defineProps({
    draggedComponent: {
      type: Object as PropType<FormSchema | Object>,
      default: () => {},
    },
    draggedComponentList: {
      type: Array as PropType<FormSchema[]>,
      default: () => {},
    },
    draggedIndex: {
      type: Number,
      default: 0,
    },
  });

  // formValue
  const formValue = ref<FormSchema>({
    field: '',
    component: 'NAutoComplete',
    label: '',
    placeholder: '',
    defaultValue: '',
    disabled: false,
    rule: {
      required: true,
      message: '',
      trigger: ['change'],
    },
  });
  const activeIconPosition = ref('');
  const IconSelectionModalRef = ref<InstanceType<typeof IconSelectionModal>>();

  const getProps = computed(() => {
    return {
      ...unref($props),
    };
  });

  /**
   * 输入框失去焦点事件
   * @param keyName
   */
  function blurUpdateKeyEvent(keyName: string): void {
    const cloneDraggedComponent = getProps.value.draggedComponent;
    cloneDraggedComponent[keyName] = formValue.value[keyName];
    $emits('update:rightSetDraggedComponent', cloneDraggedComponent, getProps.value.draggedIndex);
  }

  /**
   * 清空事件
   * @param keyName
   */
  function clearableHandleClick(keyName: string): void {
    formValue.value[keyName] = '';
    blurUpdateKeyEvent(keyName);
  }

  /**
   * 根据value和key更新事件
   */
  function handleUpdateValue(v: any, keyName: string) {
    const cloneDraggedComponent = getProps.value.draggedComponent;
    const slice = keyName.split('.');
    if (slice.length === 1) {
      cloneDraggedComponent[slice[0]] = v;
    } else if (slice.length === 2) {
      cloneDraggedComponent[slice[0]][slice[1]] = v;
    }
    $emits('update:rightSetDraggedComponent', cloneDraggedComponent, getProps.value.draggedIndex);
  }

  function setFormValue(draggedComponent) {
    const cloneDragged = cloneDeep(unref(draggedComponent)) as FormSchema;
    if (!isEmpty(cloneDragged)) {
      formValue.value = cloneDragged;
      formValue.value.defaultValue = cloneDragged.defaultValue ? cloneDragged.defaultValue : '';
    }
  }

  /**
   * 图标选择事件
   */
  function addInputIconClick(iconPosition) {
    activeIconPosition.value = iconPosition;
    IconSelectionModalRef.value?.setModal(true);
  }
  function selectionIcon(iconName) {
    handleUpdateValue(iconName, activeIconPosition.value);
  }

  defineExpose({ setFormValue });
</script>

<template>
  <NCard title="组件属性">
    <NForm
      v-if="getProps.draggedComponentList.length > 0"
      :inline="false"
      :model="formValue"
      labelPlacement="left"
      labelAlign="left"
      :label-width="80"
      :showFeedback="true"
    >
      <NFormItem path="label" label="标题:">
        <NInput
          v-model:value="formValue.label"
          placeholder="请输入标题"
          clearable
          @blur="() => blurUpdateKeyEvent('label')"
        />
      </NFormItem>
      <NFormItem path="placeholder" label="提示:">
        <NInput
          v-model:value="formValue.placeholder"
          placeholder="请输入提示"
          clearable
          @blur="() => blurUpdateKeyEvent('placeholder')"
        />
      </NFormItem>
      <NFormItem path="defaultValue" label="默认值:">
        <NInputGroup>
          <NInput
            v-model:value="formValue.defaultValue"
            placeholder="请输入默认值"
            @blur="() => blurUpdateKeyEvent('defaultValue')"
          />
          <n-button type="info" @click="clearableHandleClick('defaultValue')"> 清空 </n-button>
        </NInputGroup>
      </NFormItem>
      <NFormItem path="disabled" label="是否只读:">
        <NSwitch
          v-model:value="formValue.disabled"
          :checked-value="true"
          :unchecked-value="false"
          @update:value="(e) => handleUpdateValue(e, 'disabled')"
        />
      </NFormItem>
      <NFormItem path="rule.required" label="是否必填:">
        <NSwitch
          v-if="isArray(formValue.rule)"
          v-model:value="formValue.rule[0].required"
          :checked-value="true"
          :unchecked-value="false"
          @update:value="(e) => handleUpdateValue(e, 'rule.required')"
        />
        <NSwitch
          v-else
          v-model:value="formValue.rule.required"
          :checked-value="true"
          :unchecked-value="false"
          @update:value="(e) => handleUpdateValue(e, 'rule.required')"
        />
      </NFormItem>
      <NFormItem path="prefixIcon" label="前图标:">
        <NInputGroup>
          <NButton type="info" @click="addInputIconClick('prefixIcon')"> 添加 </NButton>
          <NInput v-model:value="formValue.prefixIcon" placeholder="不可输入，请选择" disabled />
          <NButton type="info" @click="handleUpdateValue('', 'prefixIcon')"> 删除 </NButton>
        </NInputGroup>
      </NFormItem>
      <NFormItem path="prefixIcon" label="后图标:">
        <NInputGroup>
          <NButton type="info" @click="addInputIconClick('suffixIcon')"> 添加 </NButton>
          <NInput v-model:value="formValue.suffixIcon" placeholder="不可输入，请选择" disabled />
          <NButton type="info" @click="handleUpdateValue('', 'suffixIcon')"> 删除 </NButton>
        </NInputGroup>
      </NFormItem>
    </NForm>
    <IconSelectionModal ref="IconSelectionModalRef" @set:selectionIcon="selectionIcon" />
  </NCard>
</template>
