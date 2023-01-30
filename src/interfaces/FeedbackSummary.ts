export default interface FeedbackSummary {
    feedbackSummary: {
        /**
         * Number of ratings left by customers.
         */
        count: number,

        /**
         * Number between 0 - 100 determining the percentage of positive feedback.
         */
        percentage: number;

        /**
         * A floating point between 0 - 5 used to build a 1/5 rating for the current entity's overall feedback.
         */
        stars: number;
    }
}