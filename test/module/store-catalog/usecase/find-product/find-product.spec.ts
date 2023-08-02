import { Id } from '@app/module/@shared/value-objects/Id';
import { FindProductUseCase } from '@app/module/store-catalog/usecase/find-product/find-product';
import { ProductRepositoryMock } from '@test/module/store-catalog/mocks/ProductRepositoryMock';
import { describe, expect, it } from 'vitest';

const productRepositoryMock = new ProductRepositoryMock();
describe ('Product store catalog' , () => {
    it ('should find a product by ID', async () => {
        const usecase = new FindProductUseCase(productRepositoryMock);
        const id = new Id('1')
        const { product } = await usecase.execute({id});

        expect(productRepositoryMock.find).toBeCalled();
        expect(product.id.value).toBe('1');
        expect(product.name).toBe('product 1');
        expect(product.description).toBe('description 1');
        expect(product.salesPrice).toBe(10);
    })
});