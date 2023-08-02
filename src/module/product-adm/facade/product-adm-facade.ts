import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { AddProductOutputDto, AddProductInputDto } from "@app/module/product-adm/usecases/add-products/add-product-dto";
import { CheckStockInputDto , CheckStockOutputDto } from "@app/module/product-adm/usecases/check-stock/check-stock-dto";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto } from "@app/module/product-adm/facade/product-adm-facade.interface";

type ProductAdmFacadeProps = {
    checkProductStockUseCase: UseCaseInterface<CheckStockInputDto, CheckStockOutputDto>;
    addProductUseCase: UseCaseInterface<AddProductInputDto, AddProductOutputDto>;
}

export class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _checkProductStockUseCase: UseCaseInterface<CheckStockInputDto, CheckStockOutputDto>;
    private _addProductUseCase: UseCaseInterface<AddProductInputDto, AddProductOutputDto>;

    constructor(input: ProductAdmFacadeProps) {
        this._checkProductStockUseCase = input.checkProductStockUseCase;
        this._addProductUseCase = input.addProductUseCase;
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        await this._addProductUseCase.execute(input);
    }

    async checkProductStock(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
        return await this._checkProductStockUseCase.execute(input);
    }
}