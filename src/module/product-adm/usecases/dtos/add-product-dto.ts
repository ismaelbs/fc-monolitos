export type AddProductInputDto = {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export type AddProductOutputDto = {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    cretedAt: Date;
    updatedAt: Date;
}