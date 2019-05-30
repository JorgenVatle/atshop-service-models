import ModelDocument from './ModelDocument';

export type RequireShipping = 'no' | 'ask' | 'require';

export default interface ProductDocument extends ModelDocument {
    name: string;
    description: string;
    purchaseNotes: string;
    icon: string;
    minQuantity: number;
    style: string;
    requireShipping: RequireShipping;
    preventDuplicates: boolean;
    value: number; // In cents.
    displayDescription: boolean;
    shopId: string;
    stockCount: number;
    totalStockCount: number;
    priority: number;
    category: string;
    useOrderIdAsItemName: boolean;
    deletedAt: Date;
    ratingCount: number,
    feedback?: {
        count: number;
        score: number;
    }
}