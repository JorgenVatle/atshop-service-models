/**
 * JavaScript key-value object.
 */
export type KeyValue<T = any> = { [key: string]: T };

/**
 * Omit the given keys from the given interface.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>