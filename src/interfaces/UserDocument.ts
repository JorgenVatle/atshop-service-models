import ModelDocument from './ModelDocument';

export interface UserDocument extends ModelDocument {

    services: {
        discord: DiscordService,
        twitter: TwitterService,
        google: GoogleService,
        intercom: IntercomService,
        paylike: PaylikeService,
        resume: [ResumeService]
    }

    profile: {
        /**
         * User display name.
         */
        name: string,

        /**
         * Optional avatar override for the user.
         */
        avatar?: string,

        /**
         * Optional email field to profile.
         */
        email?: string,
    },

    /**
     * Whether or not the current user has used their free trial.
     */
    trialUsed: boolean,

    /**
     * Whether or not the user bypasses fraud checks for ATShop subscriptions.
     */
    bypassRisk: boolean,

    /**
     * Risk score of the user's last ATShop subscription payment attempt.
     */
    risk: number,

    /**
     * Amount of risk to allow for the user when purchasing an ATShop subscription.
     */
    allowRisk: number,

    /**
     * Whether or not this user has permission to manage shops and users.
     */
    accountManager?: boolean,
}

export interface DiscordService {
    /**
     * User display name.
     */
    username: string,

    /**
     * Whether or not the email address has been verified.
     */
    verified: boolean,

    /**
     * Whether or not the user has 2 factor authentication enabled.
     */
    mfa_enabled: boolean,

    /**
     * User's snowflake ID.
     */
    id: string,

    /**
     * User's discriminator.
     * (E.g. 0542)
     */
    discriminator: string,

    /**
     * Avatar Identifier.
     * (Not full URL)
     */
    avatar: string,

    /**
     * Associated Discord email.
     */
    email: string,

    /**
     * Discord access token.
     */
    accessToken: string,
}

export interface GoogleService {
    /**
     * Google account email.
     */
    email: string,

    /**
     * User full name.
     */
    name: string,

    /**
     * User first name.
     */
    given_name: string,

    /**
     * User last name.
     */
    family_name: string,

    /**
     * Full URL to the user's profile image.
     */
    picture: string,

    /**
     * User language.
     * (ISO 639-1)
     */
    locale: string,

    /**
     * User gender.
     */
    gender: string,

    /**
     * Google account ID
     */
    id: string,

    /**
     * Google data permission scopes.
     */
    scope: Array<string>

    // Todo: Find Google OAuth user documentation:

    /**
     * Whether or not the user's email address has been verified?
     * (Can't find documentation for this)
     */
    verified_email: boolean,

    /**
     * Access token expiry?
     */
    expiresAt: number,

    /**
     * OAuth Account identifier?
     */
    idToken: string,
}

export interface TwitterService {
    /**
     * Twitter user ID
     */
    id: string,

    /**
     * User display name.
     */
    screenName: string,

    /**
     * Twitter access token.
     */
    accessToken: string,

    /**
     * Secret to the above access token.
     */
    accessTokenSecret: string,

    /**
     * Non-secure image URI to the Twitter user's avatar.
     */
    profile_image_url: string,

    /**
     * Secure URI equivalent of profile_image_url.
     */
    profile_image_url_https: string,

    /**
     * User language.
     * (ISO 639-1)
     */
    lang: string,

    /**
     * User email address.
     */
    email: string,
}

export interface IntercomService {

    /**
     * Intercom-specific HMAC of the user's ID (_id).
     */
    hash: string,
}

export interface PaylikeService {
    card: {
        id: string,
        merchantId: string,
        created: string,
        bin: string,
        last4: string,
        expiry: string,
        scheme: string,
    },
}

/**
 * Meteor Accounts session service
 */
export interface ResumeService {
    when: Date,
    hashedToken: string,
    token?: string,
    id?: string,
}

/**
 * User billing data object
 */
export interface BillingInformation {
    name: string;
    country: string;
    address: string;
    address_2: string;
    city: string;
}