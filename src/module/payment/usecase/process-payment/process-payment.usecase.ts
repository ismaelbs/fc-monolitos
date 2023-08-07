import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { Transaction } from "@app/module/payment/domain/transaction";
import { TransactionGatewayInterface } from "@app/module/payment/gateway/transation.gateway";

type ProcessPaymentUsecaseInputDto = {
    amount: number,
    orderId: string,
}

type ProcessPaymentUsecaseOutputDto = {
    transactionId: string,
    orderId: string,
    status: string,
    amount: number,
    createdAt: Date,
    updatedAt: Date
}

export class ProcessPaymentUsecase implements UseCaseInterface<ProcessPaymentUsecaseInputDto, ProcessPaymentUsecaseOutputDto> {
    constructor(private transactionGateway: TransactionGatewayInterface) { }

    public async execute(input: ProcessPaymentUsecaseInputDto): Promise<ProcessPaymentUsecaseOutputDto> {
        const transaction = new Transaction({
            amount: input.amount,
            orderId: input.orderId
        });
        transaction.process();
        const persistedTransaction = await this.transactionGateway.save(transaction);
        
        return {
            transactionId: persistedTransaction.id.value,
            orderId: persistedTransaction.orderId,
            status: persistedTransaction.status,
            amount: persistedTransaction.amount,
            createdAt: persistedTransaction.createdAt,
            updatedAt: persistedTransaction.updatedAt
        }
    }
}