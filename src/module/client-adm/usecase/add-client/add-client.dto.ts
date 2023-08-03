export type AddClientInputUseCaseDto = {
    id?: string;
    name: string;
    email: string;
    address: string;
}

export type AddClientOutUseCaseDto = {
    id: string;
    name: string;
    email: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}