import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { Id } from "@app/module/@shared/value-objects/Id";
import { Product } from "@app/module/product-adm/domain/product";
import { ProductGateway } from "@app/module/product-adm/gateway/product-gateway";
import { AddProductInputDto, AddProductOutputDto } from "@app/module/product-adm/usecases/add-products/add-product-dto";

export class AddProductUseCase implements UseCaseInterface<AddProductInputDto, AddProductOutputDto> {
    constructor(private readonly productRepository: ProductGateway) {}

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
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