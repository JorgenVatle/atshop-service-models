import { KeyValue } from './TS';

export default {

    /**
     * Create a full URL using the given protocol and host to the given path.
     */
    urlTo(protocol: 'http' | 'https', host: string, path: string, query: KeyValue<string | undefined | null> = {}) {
        return `${protocol}://${host}/${path.replace(/^\/+/, '')}${this.objectToQuerystring(query)}`;
    },

    /**
     * Convert a normal JavaScript Key-Value object to querystring.
     * @param object
     */
    objectToQuerystring(object: KeyValue<string | undefined | null>) {
        const params: string[] = [];

        Object.entries(object).forEach(([key, value]) => {
            if (value === undefined) {
                return;
            }

            if (value === null) {
                return params.push(key);
            }

            params.push(`${key}=${encodeURIComponent(value)}`);
        });

        if (!params.length) {
            return '';
        }

        return `?${params.join('&')}`;
    },

}