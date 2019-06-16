import { Application } from '@feathersjs/feathers';
import OrderModel from '../models/OrderModel';
import CategoryModel from '../models/CategoryModel';
import CustomerBlacklistModel from '../models/CustomerBlacklistModel';
import GatewayModel from '../models/GatewayModel';
import IpnModel from '../models/IpnModel';
import OrderEventModel from '../models/OrderEventModel';
import OrderFeedbackModel from '../models/OrderFeedbackModel';
import ProductModel from '../models/ProductModel';
import ProductStockModel from '../models/ProductStockModel';
import ShopModel from '../models/ShopModel';
import UserModel from '../models/UserModel';

interface ConfigOptions {
    app: Application,
    frontend?: {
        host?: string,
        protocol?: 'http' | 'https',
    },
    models?: Partial<{
        CategoryModel: typeof CategoryModel,
        CustomerBlacklistModel: typeof CustomerBlacklistModel,
        GatewayModel: typeof GatewayModel,
        IpnModel: typeof IpnModel,
        OrderEventModel: typeof OrderEventModel,
        OrderFeedbackModel: typeof OrderFeedbackModel,
        OrderModel: typeof OrderModel,
        ProductModel: typeof ProductModel,
        ProductStockModel: typeof ProductStockModel,
        ShopModel: typeof ShopModel,
        UserModel: typeof UserModel,
    }>,
}

/**
 * Feathers Application.
 */
export let App: Application;

/**
 * Configure Feathers Service Models.
 */
export const config = (options: ConfigOptions) => {
    App = options.app;
    App.set('frontend', {
        host: 'atshop.io',
        protocol: 'https',
        ...options.frontend,
    });

    if (options.models) {
        Object.entries(options.models).forEach(([modelName, model]) => {
            App.set(`atshop-service-models.model.${modelName}`, model);
        });
    }
};