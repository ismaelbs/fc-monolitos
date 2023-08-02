import { Id } from "@app/module/@shared/value-objects/Id";
import { Product } from "@app/module/store-catalog/entity/product";

export interface ProductGateway {
    findAll(): Promise<Product[]>
    find(id: Id): Promise<Product>
}