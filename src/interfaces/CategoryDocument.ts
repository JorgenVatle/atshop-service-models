import ModelDocument from './ModelDocument';

export default interface CategoryDocument extends ModelDocument {
    /**
     * Category heading.
     */
    title: string;

    /**
     * ID of the shop this category belongs to.
     */
    shopId: string;

    /**
     * Background colour of the current category.
     * @deprecated
     */
    color: string;

    /**
     * Whether or not the background colour of this category should be a gradient instead of a static colour.
     * @deprecated
     */
    gradient: boolean;

    /**
     * Whether or not we should dynamically resize products according to the number of products in this category.
     * @deprecated
     */
    dynamicSize: boolean;

    /**
     * Position of this category relative to other categories.
     */
    position: number;

    /**
     * Unique slug for this category.
     * Handy as a fragment identifier when you want to link customers to a specific category.
     */
    slug: string;
}