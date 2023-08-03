import { Id } from "@app/module/@shared/value-objects/Id";
import { Product } from "@app/module/product-adm/domain/product";
import { ProductGateway } from "@app/module/product-adm/gateway/product-gateway";
import { ProductModel } from "@app/module/product-adm/repository/product.model";

export class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.createdAt,
        })
    }

    async find(id: string): Promise<Product> {
        const product = await ProductModel.findOne({ where: { id: id } });

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