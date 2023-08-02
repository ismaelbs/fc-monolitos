import { StoreCatalogFacade } from "@app/module/store-catalog/facade/store-catalog.facade";
import { ProductRepository } from "@app/module/store-catalog/repository/product.repository";
import { FindAllProductsUseCase } from "@app/module/store-catalog/usecase/find-all-products/find-all-products";
import { FindProductUseCase } from "@app/module/store-catalog/usecase/find-product/find-product";

export class StoreCatalogFactoryFacadeFactory {
    public static create() {
        const productRepository = new ProductRepository();
        const findAllProductUsecase = new FindAllProductsUseCase(productRepository);
        const findProductUsecase = new FindProductUseCase(productRepository);
        const facade = new StoreCatalogFacade({
            findAllUseCase: findAllProductUsecase,
            findUseCase: findProductUsecase
        });
        return facade;
    }
}