import Client from './FeathersClient';

export async function setup() {
    const result: unknown = await Client.service('/shops').find({ domain: 'demo-shop' }).catch((error: Error) => {
        throw new Error(`Ran into an issue communicating with the API service: ${error.message}`)
    });
    
    if (!result) throw new Error('No result from API service.');
    if (typeof result !== 'object') throw new Error('Result from API service is not an object.');
    if (!('total' in result)) throw new Error('Result from API service does not have a total property.');
    if (!('data' in result)) throw new Error('Result from API service does not have a data property.');
    if (typeof result.total !== 'number') throw new Error('Result from API service has a non-number total property.');
}