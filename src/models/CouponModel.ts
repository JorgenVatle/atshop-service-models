import ServiceModel from '../providers/ServiceModel';
import { ModelTimestamps } from '../interfaces/documents/ModelDocument';
import CouponDocument from '../interfaces/documents/CouponDocument';

class CouponModel extends ServiceModel {

    /**
     * Service path for the shop coupons service.
     */
    public static readonly servicePath = '/shop/coupons';

    /**
     * Orders that are using this coupon code.
     */
    public orders() {
        return this.hasMany('OrderModel', 'couponId');
    }

    /**
     * A coupon belongs to a shop.
     */
    public shop() {
        return this.belongsTo('ShopModel', this.shopId);
    }

    /**
     * Update the number of uses this coupon has received.
     */
    public async updateUsage() {
        await this.patch({
            uses: await this.orders().find({ paid: true }).count()
        })
    }

}

interface CouponModel extends Omit<CouponDocument, ModelTimestamps> {
    entry: CouponDocument;
}

export default CouponModel;