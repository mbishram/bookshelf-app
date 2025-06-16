/**
 * Check if `value` is null or undefined
 * @param {any} value
 * @returns {boolean}
 */
export const isNil = (value) => value === null || value === undefined ||
    typeof value === "undefined";