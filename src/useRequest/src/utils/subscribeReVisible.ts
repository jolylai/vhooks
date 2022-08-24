import isDocumentVisible from "./isDocumentVisible";

type Listener = () => void;

const listeners: Listener[] = [];

const revalidate = () => {
  if (!isDocumentVisible()) return;

  for (let listener of listeners) {
    listener();
  }
};

document.addEventListener("visibilitychange", revalidate);

const subscribe = (listener: Listener) => {
  listeners.push(listener);

  return function unsubscribe() {
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  };
};

export default subscribe;
