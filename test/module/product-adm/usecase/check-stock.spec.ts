import { describe, expect, it, vi } from 'vitest'
import { CheckProductStockUseCase } from '../../../../src/module/product-adm/usecases/check-stock/check-stock-usecase';
import { Id } from '../../../../src/module/@shared/value-objects/Id';

const ProductRepositoryMock = {
    add: vi.fn(),
    find: vi.fn().mockReturnValue({
        id: new Id('1'),
        stock: 10,
        name: 'product',
        purchasePrice: 10,
        description: 'description'
    })
}

describe ('Check stock usecase test' , () => {
    it ('should check stock', async () => {
        const productUseCase = new CheckProductStockUseCase(ProductRepositoryMock);
        const output = await productUseCase.execute({
            productId: '1'
        });        

        expect(ProductRepositoryMock.find).toBeCalled();
        expect(output.productId).toBe('1');
        expect(output.stock).toBe(10);
    })
});