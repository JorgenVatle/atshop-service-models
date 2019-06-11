import ModelDocument from './ModelDocument';

export type OrderEventName = string;
export type OrderEventMetadata = {
    [s: string]: any,
}

export interface BaseMetadata {
    title: string;
    level: 'success' | 'warning' | 'default' | 'danger';
}

export default interface OrderEventDocument extends ModelDocument {
    orderId: string;
    name: OrderEventName;
    metadata: OrderEventMetadata;
}