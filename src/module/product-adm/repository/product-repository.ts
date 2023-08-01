import { Id } from "../../@shared/value-objects/Id";
import { Product } from "../domain/product";
import { ProductGateway } from "../gateway/product-gateway";
import { ProductModel } from "./product.model";

export class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.created_at,
            updatedAt: product.updated_at,
        })
    }

    async find(id: Id): Promise<Product> {
        const product = await ProductModel.findOne({ where: { id: id.value } });

        if (!product) {
            throw new Error('Product not found');
        }

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            cretedAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    }
}