import ModelDocument from './ModelDocument';

/**
 * Order event name.
 */
export type OrderEventName = 'order_on_hold'
    | 'order_fulfilled'
    | 'order_manually_approved'
    | 'order_status_reversed'
    | 'order_status_discarded'
    ;

/**
 * Order event metadata.
 */
export type OrderEventMetadata = {
    [s: string]: any,
}

export interface BaseMetadata {
    /**
     * Human readable heading for the current event.
     */
    title: string;

    /**
     * Event level for use in determining a semantic highlight level in the administration interface.
     */
    level: 'success' | 'warning' | 'default' | 'danger';
}

export default interface OrderEventDocument extends ModelDocument {
    /**
     * ID of the order this event belongs to.
     */
    orderId: string;

    /**
     * Computer-readable event title.
     * @note Used as a fallback if we can't generate a human readable title for the current event.
     */
    name: OrderEventName;

    /**
     * Event metadata.
     */
    metadata: OrderEventMetadata;
}