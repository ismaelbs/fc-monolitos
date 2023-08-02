import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { FindAllProductsOutput } from "@app/module/store-catalog/usecase/find-all-products/find-all-products.dto";

export type StoreCatalogFacadeProps = {
    findAllProductUsecase: UseCaseInterface<void, FindAllProductsOutput>;
}