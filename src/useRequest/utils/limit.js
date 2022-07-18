export default function limit(fn, timespan) {
    let pending = false;
    return function (...args) {
        if (pending)
            return;
        pending = true;
        fn(...args);
        setTimeout(() => {
            pending = false;
        }, timespan);
    };
}
//# sourceMappingURL=limit.js.map