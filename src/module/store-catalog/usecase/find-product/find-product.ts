import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { ProductGateway } from "@app/module/store-catalog/gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "@app/module/store-catalog/usecase/find-product/find-product.dto";

export class FindProductUseCase implements UseCaseInterface<FindProductInputDto, FindProductOutputDto> {
    constructor(private productRepository: ProductGateway) {}

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        return {
            product: await this.productRepository.find(input.id)
        };
    }
}