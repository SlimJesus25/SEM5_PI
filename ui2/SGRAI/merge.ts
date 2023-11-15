import _ from "lodash";

export function merge(object: any, ...sources: any[]): any {
    return _.mergeWith(object, ...sources, (objValue, srcValue, key, object, source) => {
        if (_.isArray(objValue)) {
            return objValue.concat(srcValue);
        } else {
            const descriptor = Object.getOwnPropertyDescriptor(object, key);
            if (descriptor !== undefined && !descriptor.writable) {
                descriptor.value = srcValue;
                descriptor.writable = true;
                Object.defineProperty(object, key, descriptor);
                descriptor.writable = false;
                Object.defineProperty(object, key, descriptor);
            }
        }
    });
}
