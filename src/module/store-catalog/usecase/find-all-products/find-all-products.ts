import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { Product } from "@app/module/store-catalog/entity/product";
import { ProductGateway } from "@app/module/store-catalog/gateway/product.gateway";

export class FindAllProductsUseCase implements UseCaseInterface<void, Product[]> {
    constructor(private productRepository: ProductGateway) {}

    async execute(): Promise<Product[]> {
        return this.productRepository.findAll();
    }
}