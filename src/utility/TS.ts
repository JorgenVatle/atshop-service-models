/**
 * JavaScript key-value object.
 */
export type KeyValue = { [key: string]: any };

/**
 * Omit the given keys from the given interface.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>