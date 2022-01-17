import { ref } from "vue";

interface Options {
  min?: number;
  max?: number;
}

const getTargetValue = (value: number, options: Options) => {
  const { min, max } = options;
  let targetValue = value;

  if (typeof min === "number") {
    targetValue = Math.max(targetValue, min);
  }

  if (typeof max === "number") {
    targetValue = Math.min(targetValue, max);
  }

  return targetValue;
};

const useCounter = (initialValue: number, options: Options) => {
  const current = ref(getTargetValue(initialValue, options));

  const setValue = (value: number) => {
    const targetValue = getTargetValue(value, options);

    current.value = targetValue;
  };

  const dec = (delta: number = 1) => {
    setValue(current.value - delta);
  };

  const inc = (delta: number = 1) => {
    setValue(current.value + delta);
  };

  const set = (value: number) => {
    setValue(value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return [current, { inc, dec, set, reset }];
};

export default useCounter;
