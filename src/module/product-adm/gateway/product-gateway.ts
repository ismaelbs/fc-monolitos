import { Id } from "../../@shared/value-objects/Id";
import { Product } from "../domain/product";

export interface ProductGateway {
    add(product: Product): Promise<void>
    find(id: Id): Promise<Product>
}