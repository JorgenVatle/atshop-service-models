export default interface ModelDocument {
    /**
     * Unique identifier for the current document.
     */
    _id: string;

    /**
     * Document creation date.
     */
    createdAt: Date | string;

    /**
     * Date of the last document update.
     */
    updatedAt: Date | string;

    /**
     * Soft-deletion date of the current document.
     */
    deletedAt?: Date | string;

    /**
     * Document revision number.
     */
    __v?: number;
}