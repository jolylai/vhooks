import { reactive, ref, toRefs, unref, watch, watchEffect } from "vue";

interface Options {
  targetDate: TDate;
  interval: number;
  onEnd: () => void;
}

type TDate = number | Date | string | undefined;

const getCountdown = (targetDate: TDate) => {
  if (targetDate === undefined) return 0;
  return new Date(unref(targetDate)).getTime() - Date.now();
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
  const { targetDate, interval = 1000 } = options;

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

    if (countdown === 0 && typeof options.onEnd) {
      options.onEnd();
    }

    Object.assign(formattedRes, formattedTime);
  });

  watchEffect((onInvalid) => {
    const currentCountDown = getCountdown(targetDate);
    console.log("targetDate: ", targetDate);

    if (!currentCountDown) return;

    countdown.value = currentCountDown;
    const timer = setInterval(() => {
      console.log("countdown.value : ", countdown.value);
    }, interval);

    onInvalid(() => {
      clearInterval(timer);
    });
  });

  return [countdown, toRefs(formattedRes)];
};

export default useCountDown;
