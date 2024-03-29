import ModelDocument from './ModelDocument';
import { DineroObject } from 'dinero.js';
import { FeedbackRating } from './OrderFeedbackDocument';
import { PaymentGateway } from './GatewayDocument';
import { CurrencyCode } from '../../utility/AvailableCurrencies';

/**
 * Order event name.
 */
export type OrderEventName = keyof OrderEventDataFields;

/**
 * Order event metadata.
 */
export type OrderEventMetadata<T extends OrderEventName = any> = OrderEventDataFields[T];

/**
 * Defines a simple standard interface for an event's title and notification level.
 * Used for webhooks and rendering more user-friendly labels for a given order event.
 */
export interface OrderEventLabel {
    /**
     * Human readable heading for the current event.
     */
    title: string;

    /**
     * Event level for use in determining a semantic highlight level in the administration interface.
     */
    level: 'success' | 'warning' | 'default' | 'danger';
}

export default interface OrderEventDocument<T extends OrderEventName = any> extends ModelDocument {
    /**
     * ID of the order this event belongs to.
     */
    orderId: string;

    /**
     * Computer-readable event title.
     * @note Used as a fallback if we can't generate a human readable title for the current event.
     */
    name: T;

    /**
     * Event metadata.
     */
    data: OrderEventMetadata<T>;
}

/**
 * Metadata fields for logged order events.
 */
export interface OrderEventDataFields {
    order_status_refunded: {
        amount: number;
        currency: CurrencyCode;
    }
    order_status_partially_refunded: {
        amount: number;
        currency: CurrencyCode;
    }
    order_status_pending: {
        gateway: PaymentGateway;
        checkoutId?: string;
        transactionLink?: string;
    }
    order_status_discarded: {
        userId: string;
    }
    order_invalid_receiver: {
        intended: string;
        received: string;
    }
    order_invalid_amount: {
        received: number;
        intended: number;
    }
    order_invalid_currency: {
        received: CurrencyCode;
        intended: CurrencyCode;
    }
    order_replacement: {
        quantity: number;
        userId: string;
    }
    order_on_hold: {
        message: string;
    }
    order_manually_approved: {
        userId: string;
    }
    order_confirmation_email_failed: {
        message: string;
    }
    order_invalid_payment_hash: {
        gateway: string;
    }
    order_authenticity_failed: {
        gateway: string;
    }
    fulfilled_with_alternative_payment: {
        gateway: string;
        userId: string;
    }
    order_items_restricted: {
        userId: string;
        reason?: string;
    }
    order_items_unrestricted: {
        userId: string;
        note: string;
    }
    feedback_added: {
        type: FeedbackRating;
        feedbackId: string;
    }
    feedback_updated: {
        type: FeedbackRating;
        feedbackId: string;
    }
    feedback_invalidated: {
        feedbackId: string;
        invalidationType: string[];
    }
    start_checkout: {
        gateway: PaymentGateway;
    }
    view_replacement_items: {
        replacementId: string;
    },
    order_paid_after_expiry: {
        gateway?: PaymentGateway;
    }
    order_status_overpaid: {
        expected: DineroObject;
        overpaid: DineroObject;
        paid: DineroObject;
    }
    order_multiple_payments: {
        gateway: PaymentGateway;
        payments: DineroObject[];
    }
    checkout_failed: {}
    order_fulfilled: {},
    order_checkout_g2a: {},
    order_confirmation_email_sent: {}
    order_pending: {}
    order_out_of_stock: {}
    order_viewed: {}
    order_dispute: {}
    order_dispute_ended_customer: {}
    order_status_reversed: {}
    order_status_denied: {}
    order_status_canceled_reversal: {}
    order_checkout_canceled: {}
    order_checkout_rejected: {},
    'coinbase-commerce:resolved': {}
}