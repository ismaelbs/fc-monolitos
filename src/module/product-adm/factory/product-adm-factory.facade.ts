import { ProductAdmFacade } from "../facade/product-adm-facade";
import { ProductRepository } from "../repository/product-repository";
import { AddProductUseCase } from "../usecases/add-products/add-product-usecase";
import { CheckProductStockUseCase } from "../usecases/check-stock/check-stock-usecase";

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