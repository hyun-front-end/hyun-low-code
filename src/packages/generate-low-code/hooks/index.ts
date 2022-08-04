import { ref } from 'vue';
import { FormSchema } from '@/views/generate-low-code/types/from';
import { useImmutable } from '@/views/generate-low-code/hooks/useImmutable';

/**
 * 开始使用低代码生成
 */
export function useGenerateLowCode() {
  const formValue = ref({});
  // 所有已在画布中的list
  const draggedComponentList = ref<FormSchema[]>([]);

  // 选中的值
  const draggedComponent = ref<FormSchema | Object>({});
  // 选中值的下标
  const draggedIndex = ref(0);

  // 选中值的get set 方法
  const [getDraggedComponent, setDraggedComponent] = useImmutable<FormSchema | Object>(
    draggedComponent
  );
  // 选中值的下标的 get set 方法
  const [getDraggedIndex, setDraggedIndex] = useImmutable<number>(draggedIndex);
  const [getFormValue] = useImmutable<object>(formValue);

  return {
    formValue,
    draggedComponent,
    setDraggedComponent,
    getDraggedComponent,
    draggedIndex,
    getDraggedIndex,
    setDraggedIndex,
    getFormValue,

    draggedComponentList,
  };
}
