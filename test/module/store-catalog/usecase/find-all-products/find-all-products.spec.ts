import { Id } from '@app/module/@shared/value-objects/Id';
import { Product } from '@app/module/store-catalog/entity/product';
import { FindAllProductsUseCase } from '@app/module/store-catalog/usecase/find-all-products/find-all-products';
import { describe, expect, it, vi } from 'vitest'

const ProductRepositoryMock = {
    findAll: vi.fn().mockReturnValue([
        new Product({
            id: new Id('1'),
            name: 'product 1',
            description: 'description 1',
            salesPrice: 10,
        }),
        new Product({
            id: new Id('2'),
            name: 'product 2',
            description: 'description 2',
            salesPrice: 20,
        }),
    ])
}

describe ('Product store catalog' , () => {
    it ('should find all products in store catalog', async () => {
        const usecase = new FindAllProductsUseCase(ProductRepositoryMock);
        const output = await usecase.execute();

        expect(ProductRepositoryMock.findAll).toBeCalled();
        expect(output.length).toBe(2);
        expect(output[0].id.value).toBe('1');
        expect(output[0].name).toBe('product 1');
        expect(output[0].description).toBe('description 1');
        expect(output[0].salesPrice).toBe(10);
        expect(output[1].id.value).toBe('2');
        expect(output[1].name).toBe('product 2');
        expect(output[1].description).toBe('description 2');
        expect(output[1].salesPrice).toBe(20);
    })
});