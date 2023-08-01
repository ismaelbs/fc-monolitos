import { describe, expect, it, vi } from 'vitest'
import { AddProductUseCase } from '../../../../src/module/product-adm/usecases/add-product-usecase';

const ProductRepositoryMock = {
    add: vi.fn(),
    find: vi.fn()
}

describe ('Product usecase test' , () => {
    it ('should create a product', async () => {
        const input = {
            name: 'Product 1',
            description: 'Product 1 description',
            purchasePrice: 10,
            stock: 10
        };

        const productUseCase = new AddProductUseCase(ProductRepositoryMock);
        const output = await productUseCase.execute(input);

        expect(ProductRepositoryMock.add).toBeCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.description).toBe(input.description);
        expect(output.purchasePrice).toBe(input.purchasePrice);
        expect(output.stock).toBe(input.stock);
        expect(output.cretedAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    })
});