export type AddProductInput = {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export type AddProductOutput = {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    cretedAt: Date;
    updatedAt: Date;
}