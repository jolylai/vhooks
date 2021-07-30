import { ref } from "vue";

const useBoolean = (initialValue: boolean) => {
  const valueRef = ref<boolean>(initialValue);

  const toggle = (value: any) => {
    valueRef.value = !valueRef.value;
  };

  const setTrue = (): void => {
    valueRef.value = true;
  };

  const setFalse = (): void => {
    valueRef.value = false;
  };

  return {
    state: valueRef,
    setTrue,
    setFalse,
    toggle,
  };
};

export default useBoolean;
