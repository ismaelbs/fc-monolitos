import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { StoreCatalogFacadeProps } from "@app/module/store-catalog/facade/store-catalog.facade.dto";
import { FindAllProductsOutput } from "@app/module/store-catalog/usecase/find-all-products/find-all-products.dto";

export class StoreCatalogFacade {
    private _findAllProductUsecase: UseCaseInterface<void, FindAllProductsOutput>;
    constructor(input: StoreCatalogFacadeProps) {
        this._findAllProductUsecase = input.findAllProductUsecase;
    }

    async findAllProduct() {
        return await this._findAllProductUsecase.execute();
    }
}