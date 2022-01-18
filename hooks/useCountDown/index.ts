import { reactive, ref, toRefs, unref, watch, watchEffect } from "vue";
import type { Ref } from "vue";

interface Options {
  targetDate: TDate | Ref<TDate>;
  interval: number;
  onEnd: () => void;
}

type TDate = number | Date | string | undefined;

const calcLeft = (targetDate: TDate) => {
  if (!targetDate) return 0;

  const left = new Date(targetDate).getTime() - Date.now();

  if (left < 0) {
    return 0;
  }

  return left;
};

const formatTimestamp = (ms: number) => {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);
  const milliseconds = ms % 1000;

  return { days, hours, minutes, seconds, milliseconds };
};

const useCountDown = (options: Options) => {
  const { targetDate, interval = 1000, onEnd } = options;

  const countdown = ref(0);

  const formattedRes = reactive({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

  watch(countdown, (countdown) => {
    const formattedTime = formatTimestamp(countdown);

    Object.assign(formattedRes, formattedTime);
  });

  watchEffect((onInvalid) => {
    const currentCountDown = calcLeft(unref(targetDate));

    if (!currentCountDown) {
      countdown.value = 0;
      return;
    }

    countdown.value = currentCountDown;

    const timer = setInterval(() => {
      const left = calcLeft(unref(targetDate));

      if (left <= 0) {
        onEnd?.();
        clearInterval(timer);
      }

      countdown.value = left;
    }, interval);

    onInvalid(() => {
      clearInterval(timer);
    });
  });

  return [countdown, toRefs(formattedRes)];
};

export default useCountDown;
