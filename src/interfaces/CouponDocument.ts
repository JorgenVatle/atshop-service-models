import ModelDocument from './ModelDocument';

export default interface CouponDocument extends ModelDocument {
    /**
     * ID of the shop this coupon belongs to.
     */
    shopId: string;

    /**
     * The coupon code that customers reference this coupon by.
     * E.g. 'atshop-10-off'
     */
    code: string;

    /**
     * The number of total uses this coupon code has seen since its creation.
     */
    uses: number;

    /**
     * The maximum number of uses this coupon can receive. Subsequent usage requests will be rejected.
     */
    maxUses: number;

    /**
     * Discount value.
     * The actual discount applied to orders depend on the 'discountType' property.
     */
    value: number;

    /**
     * If we should apply the 'value' field as a percentage or a fixed discount in cents.
     * 10 percentage = 10% off
     * 10 fixed = $0.10 off
     */
    discountType: 'fixed' | 'percentage';

    /**
     * Array of product IDs that this coupon code is usable with.
     * Leave blank to allow all products.
     */
    productIds: string[];

    /**
     * When this coupon should start being usable to customers.
     * Leave blank to allow any time.
     */
    usableFrom: Date,

    /**
     * When this coupon code should expire.
     * Leave blank for allowing use for an infinite amount of time.
     */
    usableUntil: Date;
}