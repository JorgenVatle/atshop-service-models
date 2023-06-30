import { Application, Paginated, Params, Service } from '@feathersjs/feathers';
import PaginatedServiceModel from '../providers/PaginatedServiceModel';
import { AsyncKey } from '../providers/ServiceModel';

export default interface ServiceModelStatic<Model = any> {
    new(...args: any): Model;
    
    get App(): Application;
 
    _find(query: Params['query']): Promise<Paginated<any>>;
    
    _patch(id: string | null, data: any, params?: Params): any;
    
    // @ts-ignore
    find(query: Params): PaginatedServiceModel<InstanceType<this>>
    
    get(id: AsyncKey, query?: Params): Promise<InstanceType<this>>
    
    create(data: any, params?: Params): Promise<InstanceType<this>>
    
    get service(): Service<any>
    
    servicePath: string;
}
export type ModelInstance<Model extends ServiceModelStatic> = InstanceType<Model>
export type ModelDocumentType<Model extends ServiceModelStatic> = ModelInstance<Model>['entry'];