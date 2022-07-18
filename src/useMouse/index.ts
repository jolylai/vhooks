import { reactive, toRefs, watchPostEffect } from "vue";

const useMouse = () => {
  const state = reactive({
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    pageX: null,
    pageY: null,
  });

  const handleMousemove = (event: MouseEvent) => {
    const { screenX, screenY, clientX, clientY, pageX, pageY } = event;

    Object.assign(state, { screenX, screenY, clientX, clientY, pageX, pageY });
  };

  watchPostEffect((onInvalid) => {
    onInvalid(() => {
      document.removeEventListener("mousemove", handleMousemove);
    });

    document.addEventListener("mousemove", handleMousemove);
  });

  return toRefs(state);
};

export default useMouse;
