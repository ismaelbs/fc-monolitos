import { Id } from "../../@shared/value-objects/Id";
import { Product } from "../domain/product";
import { ProductGateway } from "../gateway/product-gateway";
import { AddProductInput, AddProductOutput } from "./dtos/add-product-dto";

export class AddProductUseCase {
    constructor(private readonly productRepository: ProductGateway) {}

    async execute(input: AddProductInput): Promise<AddProductOutput> {
        const product = new Product({
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            purchasePrice: input.purchasePrice,
            stock: input.stock
        });



        await this.productRepository.add(product);

        return {
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            cretedAt: product.created_at,
            updatedAt: product.updated_at
        };
    }
}