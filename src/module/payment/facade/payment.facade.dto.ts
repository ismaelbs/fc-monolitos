export type PaymentFacadeInputDto = {
    orderId: string;
    amount: number;
}

export type PaymentFacadeOutputDto = {
    transactionId: string;
    orderId: string;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}