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
}