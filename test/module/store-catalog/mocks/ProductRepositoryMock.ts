import { Id } from "@app/module/@shared/value-objects/Id";
import { Product } from "@app/module/store-catalog/entity/product";
import { vi } from "vitest";
export class ProductRepositoryMock {
    findAll = vi.fn().mockReturnValue([
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