import Feathers from '@feathersjs/feathers';
import FeathersRest from '@feathersjs/rest-client';
import Axios from 'axios';

const Client = Feathers();
const RestClient = FeathersRest('https://sandbox.atshop.io');

Client.configure(RestClient.axios(Axios));

export default Client;