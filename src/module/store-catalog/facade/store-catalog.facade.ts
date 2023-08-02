import { Id } from "@app/module/@shared/value-objects/Id";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "@app/module/store-catalog/facade/store-catalog.facade.interface";
import { FindAllProductsUseCase } from "@app/module/store-catalog/usecase/find-all-products/find-all-products";
import { FindProductUseCase } from "@app/module/store-catalog/usecase/find-product/find-product";

export interface UseCaseProps {
    findUseCase: FindProductUseCase;
    findAllUseCase: FindAllProductsUseCase;
}

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findUseCase: FindProductUseCase;
    private _findAllUseCase: FindAllProductsUseCase;

    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase;
        this._findAllUseCase = props.findAllUseCase;
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        const { product }  = await this._findUseCase.execute({ id: new Id(id.id) });
        return {
            id: product.id.value,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        };
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        const { products } = await this._findAllUseCase.execute();
        const mappedProduct =  products.map(product => ({
            id: product.id.value,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }))

        return {
            products: mappedProduct
        }
    }
}