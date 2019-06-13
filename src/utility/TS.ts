/**
 * JavaScript key-value object.
 */
export type KeyValue = { [key: string]: any };

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>