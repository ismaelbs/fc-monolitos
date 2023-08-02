import { Id } from "@app/module/@shared/value-objects/Id";
import { Product } from "@app/module/store-catalog/entity/product";
import { ProductGateway } from "@app/module/store-catalog/gateway/product.gateway";
import { ProductModel } from "@app/module/store-catalog/repository/product.model";

export class ProductRepository implements ProductGateway{
    async find(id: Id): Promise<Product> {
        const product = await ProductModel.findOne({ where: { id: id.value } });
        if (!product) {
            throw new Error('Product not found');
        }
        return new Product(
            {
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            }
        )
    }
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