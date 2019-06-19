import Feathers from '@feathersjs/feathers';
import FeathersRest from '@feathersjs/rest-client';
import Axios from 'axios';
import { ATShopServiceModels } from '../src';
import FeathersFactories from './FeathersFactories';

const Client = Feathers();
const RestClient = FeathersRest('https://api_sandbox.atshop.io');

Client.configure(RestClient.axios(Axios));
Client.configure(ATShopServiceModels());
Client.configure(FeathersFactories);

export default Client;