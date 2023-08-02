import { Id } from "@app/module/@shared/value-objects/Id";
import { Product } from "@app/module/store-catalog/entity/product";
import { ProductGateway } from "@app/module/store-catalog/gateway/product.gateway";
import { ProductModel } from "@app/module/store-catalog/repository/product.model";

export class ProductRepository implements ProductGateway{
    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();
        return products.map(product => new Product(
            {
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            }
        ));
    }
}