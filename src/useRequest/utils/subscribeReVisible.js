import isDocumentVisible from "./isDocumentVisible";
const listeners = [];
const revalidate = () => {
    if (!isDocumentVisible())
        return;
    for (let listener of listeners) {
        listener();
    }
};
document.addEventListener("visibilitychange", revalidate);
const subscribe = (listener) => {
    listeners.push(listener);
    return function unsubscribe() {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
    };
};
export default subscribe;
//# sourceMappingURL=subscribeReVisible.js.map