import { ProductAdmFacade } from "@app/module/product-adm/facade/product-adm-facade";
import { ProductRepository } from "@app/module/product-adm/repository/product-repository";
import { AddProductUseCase } from "@app/module/product-adm/usecases/add-products/add-product-usecase";
import { CheckProductStockUseCase } from "@app/module/product-adm/usecases/check-stock/check-stock-usecase";

export class ProductAdmFacadeFactory {
    public static create() {
        const productRepository = new ProductRepository();
        const productAdmFacade = new ProductAdmFacade({
            addProductUseCase: new AddProductUseCase(productRepository),
            checkProductStockUseCase: new CheckProductStockUseCase(productRepository),
        });

        return productAdmFacade;
    }
}