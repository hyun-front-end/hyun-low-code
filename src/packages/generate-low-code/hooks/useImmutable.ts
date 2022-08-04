import { computed, unref, Ref } from 'vue';
/**
 *
 * 传入值，返回该值对应变量的set，get方法
 * @param variable
 * @returns
 */
export function useImmutable<T>(variable: Ref<T>) {
  /**
   * set fuc.
   * @param value
   */
  function setVariable(value: T): void {
    variable.value = value;
  }

  const getVariable = computed((): T => {
    return unref(variable);
  });

  return [getVariable, setVariable];
}
