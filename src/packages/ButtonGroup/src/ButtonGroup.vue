<script setup lang="ts">
  import { ButtonActionProps, IActionProps, IButtonActionProps } from '../src/props';
  import { computed } from 'vue';
  import { isFunction } from '@/utils/is';

  const Props = defineProps({ ...ButtonActionProps });

  const getProps = computed(() => {
    return Props as IButtonActionProps;
  });

  // fetch: 防止bind绑定onClick会默认传入event
  function fetchClick(btn: IActionProps) {
    if (btn.fetch && isFunction(btn.fetch)) {
      btn.fetch();
    }
  }
</script>

<template>
  <n-space>
    <n-button
      v-for="btn in getProps.buttonActions"
      v-bind="btn"
      :loading="getProps.loading"
      @click="fetchClick(btn)"
      :key="btn.btnText"
    >
      <template #icon>
        <Icon :icon="btn.icon" />
      </template>
      {{ btn.btnText }}
    </n-button>
  </n-space>
</template>
