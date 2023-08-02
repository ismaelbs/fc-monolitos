import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { ProductGateway } from "@app/module/store-catalog/gateway/product.gateway";
import { FindAllProductsOutput } from "@app/module/store-catalog/usecase/find-all-products/find-all-products.dto";

export class FindAllProductsUseCase implements UseCaseInterface<void, FindAllProductsOutput> {
    constructor(private productRepository: ProductGateway) {}

    async execute(): Promise<FindAllProductsOutput> {
        return {
            products: await this.productRepository.findAll()
        };
    }
}