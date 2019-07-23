import Feathers from '@feathersjs/feathers';
import FeathersRest from '@feathersjs/rest-client';
import Axios from 'axios';
import { ATShopServiceModels } from '../src';
import FeathersFactories from './FeathersFactories';

require('dotenv-defaults').config();

const Client = Feathers();
const RestClient = FeathersRest(process.env.API_URL);

Client.configure(RestClient.axios(Axios));
Client.configure(ATShopServiceModels());
Client.configure(FeathersFactories);

export default Client;