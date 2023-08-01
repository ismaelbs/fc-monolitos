import { Sequelize } from "sequelize-typescript";
import { describe, it, beforeEach, expect } from "vitest";
import { ProductModel } from "../../../../src/module/product-adm/repository/product.model";
import { Product } from "../../../../src/module/product-adm/domain/product";
import { ProductRepository } from "../../../../src/module/product-adm/repository/product-repository";
import { Id } from "../../../../src/module/@shared/value-objects/Id";
let sequelize;

describe('Product Repository', () => {
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
    
    it('should create a product', async () => {
        const productProps = {
            id: new Id,
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 10,
            stock: 10,
            createdAt: new Date(),
        }

        const product = new Product(productProps);

        const productRepository = new ProductRepository();
        await productRepository.add(product);
        const foundProduct = await ProductModel.findOne({ where: { id: product.id.value } });

        expect(foundProduct).not.toBeNull();
        expect(productProps.id.value).toEqual(foundProduct?.id);
        expect(productProps.name).toEqual(foundProduct?.name);
        expect(productProps.description).toEqual(foundProduct?.description);
        expect(productProps.purchasePrice).toEqual(foundProduct?.purchasePrice);
        expect(productProps.stock).toEqual(foundProduct?.stock);
    })

    it('should find a product', async () => {
        const id = new Id;
        const productProps = {
            id,
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 10,
            stock: 10
        }

        const product = new Product(productProps);

        const productRepository = new ProductRepository();
        await productRepository.add(product);
        const foundProduct = await productRepository.find(id);

        expect(foundProduct).not.toBeNull();
        expect(productProps.id.value).toEqual(foundProduct?.id.value);
        expect(productProps.name).toEqual(foundProduct?.name);
        expect(productProps.description).toEqual(foundProduct?.description);
        expect(productProps.purchasePrice).toEqual(foundProduct?.purchasePrice);
        expect(productProps.stock).toEqual(foundProduct?.stock);
    })
});