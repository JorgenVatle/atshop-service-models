export default interface ModelDocument {
    /**
     * Unique identifier for the current document.
     */
    _id: string;

    /**
     * Document creation date.
     */
    createdAt: Date;

    /**
     * Date of the last document update.
     */
    updatedAt: Date;

    /**
     * Soft-deletion date of the current document.
     */
    deletedAt?: Date;

    /**
     * Document revision number.
     */
    __v?: number;
}