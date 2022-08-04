import { FormSchema } from '@/views/generate-low-code/types/from';

export const contentComponentProps = {
  draggedComponent: {
    type: Object as PropType<FormSchema>,
  },
  getDraggedComponent: {
    type: Object as PropType<FormSchema>,
    default: () => {},
  },
  setDraggedComponent: {
    type: Function,
    default: Function,
  },
  draggedComponentList: {
    type: Array as PropType<FormSchema[]>,
    default: () => [],
  },
  setDraggedIndex: {
    type: Function,
    default: Function,
  },
  draggedIndex: {
    type: Number,
    default: 0,
  },
};
