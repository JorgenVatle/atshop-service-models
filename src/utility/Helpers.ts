export default {

    /**
     * Create a full URL using the given protocol and host to the given path.
     */
    urlTo(protocol: 'http' | 'https', host: string, path: string) {
        return `${protocol}://${host}/${path.replace(/^\/+/, '')}`;
    }

}