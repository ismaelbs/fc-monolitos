import { UseCaseInterface } from "../../@shared/usecase/usecase-interface";
import { AddProductOutputDto, AddProductInputDto } from "../usecases/add-products/add-product-dto";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto } from "./product-adm-facade.interface";

type ProductAdmFacadeProps = {
    // checkProductStockUseCase: UseCaseInterface;
    addProductUseCase: UseCaseInterface<AddProductInputDto, AddProductOutputDto>;
}

export class ProductAdmFacade implements ProductAdmFacadeInterface {
    // private _checkProductStockUseCase: UseCaseInterface;
    private _addProductUseCase: UseCaseInterface<AddProductInputDto, AddProductOutputDto>;

    constructor(input: ProductAdmFacadeProps) {
        // this._checkProductStockUseCase = input.checkProductStockUseCase;
        this._addProductUseCase = input.addProductUseCase;
    }

    async addProduct(input: AddProductFacadeInputDto): Promise<void> {
        await this._addProductUseCase.execute(input);
    }

    // async checkProductStock(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    //     return await this._checkProductStockUseCase.execute(input);
    // }
}