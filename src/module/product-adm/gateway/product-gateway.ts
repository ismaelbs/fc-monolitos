import { Product } from "@app/module/product-adm/domain/product"

export interface ProductGateway {
    add(product: Product): Promise<void>
    find(id: string): Promise<Product>
}