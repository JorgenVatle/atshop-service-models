import { PaymentGateway } from './GatewayDocument';
import ModelDocument from './ModelDocument';

export default interface IpnDocument extends ModelDocument {
    gateway: PaymentGateway,
    data: any,
}