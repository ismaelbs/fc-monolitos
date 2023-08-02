import { Product } from "@app/module/store-catalog/entity/product";

export interface ProductGateway {
    findAll(): Promise<Product[]>
}