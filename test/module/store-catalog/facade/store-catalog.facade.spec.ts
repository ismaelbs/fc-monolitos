import { ProductModel } from "@app/module/store-catalog/repository/product.model";
import { Sequelize } from "sequelize-typescript";
import { v4 as uuid} from "uuid";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { StoreCatalogFactoryFacadeFactory } from "@app/module/store-catalog/factory/store-catalog-factory.facade";

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
        const facade = StoreCatalogFactoryFacadeFactory.create();
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
        const { products } = await facade.findAll();

        expect(products.length).toEqual(2);
        expect(products[0].id).toBe(id1);
        expect(products[0].name).toBe('Product 1');
        expect(products[0].description).toBe('Product 1 description');
        expect(products[0].salesPrice).toBe(10);

        expect(products[1].id).toBe(id2);
        expect(products[1].name).toBe('Product 2');
        expect(products[1].description).toBe('Product 2 description');
        expect(products[1].salesPrice).toBe(20);
    })

    it('should find one product of store catalog', async () => {
        const facade = StoreCatalogFactoryFacadeFactory.create();
        const id = uuid();
        await ProductModel.create({
            id: id,
            name: 'Product 1',
            description: 'Product 1 description',
            salesPrice: 10,
        });

        const product = await facade.find({id});

        expect(product.id).toBe(id);
        expect(product.name).toBe('Product 1');
        expect(product.description).toBe('Product 1 description');
        expect(product.salesPrice).toBe(10);
    })

    afterEach(async () => {
        await sequelize.close();
    })
})