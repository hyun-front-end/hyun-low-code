import { NSpace } from 'naive-ui';

export interface IButtonActionProps {
  buttonActions: IActionProps[];
  loading?: Boolean;
}
export type ButtonType = 'info' | 'success' | 'tertiary' | 'warning' | 'error';

export interface IActionProps {
  btnText: string;
  icon?: string;
  fetch?: Function;
  type?: string | ButtonType;
  disabled?: Boolean;
  onClick?: Function;
}

export const ButtonActionProps: PropType<IButtonActionProps> = {
  ...NSpace.props,
  loading: Boolean,
  buttonActions: {
    type: Array as PropType<IActionProps[]>,
  },
};
