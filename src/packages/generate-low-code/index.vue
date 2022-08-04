<!--
    独立的一个页面，不依赖其他组件的config/type 等等
-->
<template>
  <n-grid :cols="24" class="generate-flow-code-container">
    <n-gi :span="4">
      <LeftComponent />
    </n-gi>
    <n-gi :span="14">
      <ContentComponent
        ref="contentComponentRef"
        :dragged-index="draggedIndex"
        :dragged-component-list="draggedComponentList"
        :dragged-component="draggedComponent"
        :set-dragged-index="setDraggedIndex"
        @update:draggedComponent="setDraggedComponentListByIndex"
      />
    </n-gi>
    <n-gi :span="6">
      <RightComponent
        ref="rightComponentRef"
        :dragged-index="draggedIndex"
        :dragged-component="draggedComponent"
        :dragged-component-list="draggedComponentList"
        @update:rightSetDraggedComponent="setDraggedComponentListByIndex"
      />
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts" name="GenerateLowCode">
  import { ref, Ref } from 'vue';
  import { FormSchema } from './types/from';
  import { LeftComponent } from './components/GenerateLeftComponent';
  import { ContentComponent } from './components/GenerateContentComponent';
  import { RightComponent } from './components/GenerateRightComponent';

  const rightComponentRef: Ref<InstanceType<typeof RightComponent>> = ref();
  const contentComponentRef: Ref<InstanceType<typeof ContentComponent>> = ref();
  // 所有已在画布中的list
  const draggedComponentList = ref<FormSchema[]>([]);
  // 选中的值
  const draggedComponent = ref<FormSchema | Object>({});
  // 选中值的下标
  const draggedIndex = ref(0);

  /**
   * 设置选中的元素
   * @param element
   */
  function setDraggedComponent(element) {
    draggedComponent.value = element;
    rightComponentRef.value?.setFormValue(element);
    contentComponentRef.value?.setFormValue();
  }

  /**
   * 属性编辑组件修改事件
   * @param element
   * @param index
   */
  function setDraggedComponentListByIndex(element, index) {
    draggedComponentList.value[index] = element;
    console.log(element);
    setDraggedIndex(index);
    setDraggedComponent(element);
  }

  function setDraggedIndex(index) {
    draggedIndex.value = index;
  }
</script>

<style lang="scss"></style>
