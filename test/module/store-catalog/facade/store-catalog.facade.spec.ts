import { ProductModel } from "@app/module/store-catalog/repository/product.model";
import { StoreCatalogFacade } from "@app/module/store-catalog/facade/store-catalog.facade";
import { ProductRepository } from "@app/module/store-catalog/repository/product.repository";
import { FindAllProductsUseCase } from "@app/module/store-catalog/usecase/find-all-products/find-all-products";
import { Sequelize } from "sequelize-typescript";
import { v4 as uuid} from "uuid";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

let sequelize: Sequelize;

describe('ProductRepository', () => {
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

    it('should find all products of store catalog', async () => {

        const productRepository = new ProductRepository();
        const findAllProductUsecase = new FindAllProductsUseCase(productRepository);
        const facade = new StoreCatalogFacade({
            findAllProductUsecase: findAllProductUsecase
        });

        const id1 = uuid();
        const id2 = uuid();
        await ProductModel.create({
            id: id1,
            name: 'Product 1',
            description: 'Product 1 description',
            salesPrice: 10,
        });

        await ProductModel.create({
            id: id2,
            name: 'Product 2',
            description: 'Product 2 description',
            salesPrice: 20,
        });
        const { products } = await facade.findAllProduct();

        expect(products.length).toEqual(2);
        expect(products[0].id.value).toBe(id1);
        expect(products[0].name).toBe('Product 1');
        expect(products[0].description).toBe('Product 1 description');
        expect(products[0].salesPrice).toBe(10);

        expect(products[1].id.value).toBe(id2);
        expect(products[1].name).toBe('Product 2');
        expect(products[1].description).toBe('Product 2 description');
        expect(products[1].salesPrice).toBe(20);
    })

    afterEach(async () => {
        await sequelize.close();
    })
})