import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "@app/module/product-adm/repository/product.model";
import { ProductAdmFacadeFactory } from "@app/module/product-adm/factory/product-adm-factory.facade";
import { Id } from "@app/module/@shared/value-objects/Id";

let sequelize: Sequelize;
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
        };

        const productAdmFacade = ProductAdmFacadeFactory.create();
        await productAdmFacade.addProduct(productProps);
        const foundProduct = await ProductModel.findOne({ where: { id: productProps.id } });

        expect(foundProduct).not.toBeNull();
        expect(productProps.name).toEqual(foundProduct?.name);
        expect(productProps.description).toEqual(foundProduct?.description);
        expect(productProps.purchasePrice).toEqual(foundProduct?.purchasePrice);
        expect(productProps.stock).toEqual(foundProduct?.stock);
    })

    it('should check stock', async () => {
        const productProps = {
            id: new Id().value,
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 10,
            stock: 10,
        };

        const productAdmFacade = ProductAdmFacadeFactory.create();
        await productAdmFacade.addProduct(productProps);
        const productStock = await productAdmFacade.checkProductStock({ productId: productProps.id });
        const foundProduct = await ProductModel.findOne({ where: { id: productProps.id } });

        expect(foundProduct).not.toBeNull();
        expect(foundProduct?.stock).toEqual(productStock.stock);
        expect(foundProduct?.id).toEqual(productStock.productId);
    })

    afterEach(async () => {
        await sequelize.close();
    })
})