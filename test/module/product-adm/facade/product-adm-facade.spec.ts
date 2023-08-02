import { beforeEach, describe, expect, it } from "vitest";
import { ProductRepository } from "../../../../src/module/product-adm/repository/product-repository";
import { ProductAdmFacade } from "../../../../src/module/product-adm/facade/product-adm-facade";
import { AddProductUseCase } from "../../../../src/module/product-adm/usecases/add-product-usecase";
import { ProductModel } from "../../../../src/module/product-adm/repository/product.model";
import { Id } from "../../../../src/module/@shared/value-objects/Id";
import { Sequelize } from "sequelize-typescript";
import { afterEach } from "node:test";

let sequelize;
describe('ProductAdmFacade', () => {

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
            models: [ProductModel]
        });
        await sequelize.sync();
    });

    it('should create a product via facade', async () => {
        const productProps = {
            id: new Id().value,
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 10,
            stock: 10,
        }

        const productRepository = new ProductRepository();
        const productAdmFacade = new ProductAdmFacade({
            addProductUseCase: new AddProductUseCase(productRepository),
        });

        await productAdmFacade.addProduct(productProps);

        const foundProduct = await ProductModel.findOne({ where: { id: productProps.id } });

        expect(foundProduct).not.toBeNull();
        expect(productProps.name).toEqual(foundProduct?.name);
        expect(productProps.description).toEqual(foundProduct?.description);
        expect(productProps.purchasePrice).toEqual(foundProduct?.purchasePrice);
        expect(productProps.stock).toEqual(foundProduct?.stock);
    })

    afterEach(async () => {
        await sequelize.close();
    })
})