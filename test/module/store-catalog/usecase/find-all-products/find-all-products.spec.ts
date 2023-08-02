import { FindAllProductsUseCase } from '@app/module/store-catalog/usecase/find-all-products/find-all-products';
import { ProductRepositoryMock } from '@test/module/store-catalog/mocks/ProductRepositoryMock';
import { describe, expect, it } from 'vitest'

const productRepositoryMock = new ProductRepositoryMock();

describe ('Product store catalog' , () => {
    it ('should find all products in store catalog', async () => {
        const usecase = new FindAllProductsUseCase(productRepositoryMock);
        const output = await usecase.execute();
        expect(productRepositoryMock.findAll).toBeCalled();
        expect(output.products.length).toBe(2);

        expect(output.products[0].id.value).toBe('1');
        expect(output.products[0].name).toBe('product 1');
        expect(output.products[0].description).toBe('description 1');
        expect(output.products[0].salesPrice).toBe(10);
        expect(output.products[1].id.value).toBe('2');
        expect(output.products[1].name).toBe('product 2');
        expect(output.products[1].description).toBe('description 2');
        expect(output.products[1].salesPrice).toBe(20);
    })
});