import ModelDocument from './ModelDocument';
import { CurrencyCode } from '../utility/AvailableCurrencies';

export default interface ShopDocument extends ModelDocument {
    name: string;
    currency: CurrencyCode;
    domain: string;
    customDomain: string,
    tagline: string;
    companyName: string;
    companyInfo: string;
    admins: Array<string>;
    createdBy: string;
    webhooks?: {
        discord?: string;
    };
    productCount: number;
    monthRevenue: number;
    totalRevenue: number;
    style: {
        logoUri?: string,
    };
    productLimit?: number;
    deletedAt: Date;
    deletedBy: string;
    maxFraud: number;
}