export type AddProductFacadeInputDto = {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export type CheckStockInputDto = {
    productId: string;
}

export type CheckStockOutputDto = {
    productId: string;
    stock: number;
}

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    checkProductStock(input: CheckStockInputDto): Promise<CheckStockOutputDto>;
}