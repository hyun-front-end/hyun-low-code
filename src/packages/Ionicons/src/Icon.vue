<template>
  <n-icon :size="iconSize" :color="iconColor">
    <component :is="iconName" />
  </n-icon>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import components from './useIcons';
  export default defineComponent({
    components: { ...components },
    props: {
      size: {
        type: Number,
        default: 18,
      },
      color: {
        type: String,
        default: null,
      },
      icon: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      return {
        iconName: props.icon,
        iconColor: props.color,
        iconSize: props.size,
      };
    },
  });
</script>

<style lang="less" scoped></style>
