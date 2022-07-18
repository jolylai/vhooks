declare type Listener = () => void;
declare const subscribe: (listener: Listener) => () => void;
export default subscribe;
