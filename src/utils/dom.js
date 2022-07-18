import { isRef } from "vue";
export function getTargetElement(target, defaultTarget) {
    if (!target)
        return defaultTarget;
    let targetElement;
    if (typeof target === "function") {
        targetElement = target();
    }
    else if (isRef(target)) {
        targetElement = target.value;
    }
    else {
        targetElement = target;
    }
    return targetElement;
}
//# sourceMappingURL=dom.js.map