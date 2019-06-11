import ModelDocument from './ModelDocument';

export default interface CategoryDocument extends ModelDocument {
    title: string;
    shopId: string;
    color: string;
    gradient: boolean;
    dynamicSize: boolean;
    position: string;
    slug: string;
}