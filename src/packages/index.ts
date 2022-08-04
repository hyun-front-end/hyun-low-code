import { App } from 'vue';
import { HButton } from './Button';

const componentList = [HButton];

export const installComponent = (app: App) => {
  componentList.map((component) => app.component(component.name, component));
};

export default {
  installComponent,
  ...componentList,
};
