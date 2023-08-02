import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { ProductGateway } from "@app/module/product-adm/gateway/product-gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "@app/module/product-adm/usecases/check-stock/check-stock-dto";

export class CheckProductStockUseCase implements UseCaseInterface<CheckStockInputDto, CheckStockOutputDto> {
    constructor(private readonly _productRepository: ProductGateway) {}

    async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        const product = await this._productRepository.find(input.productId);
        return {
            productId: product.id.value,
            stock: product.stock,
        };
    }
}