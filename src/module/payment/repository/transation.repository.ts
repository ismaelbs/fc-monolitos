import { Id } from "@app/module/@shared/value-objects/Id";
import { Transaction } from "@app/module/payment/domain/transaction";
import { TransactionGatewayInterface } from "@app/module/payment/gateway/transation.gateway";
import { TransactionModel } from "@app/module/payment/repository/transation.model";

export class TransactionRepository implements TransactionGatewayInterface {
    async save(transation: Transaction): Promise<Transaction> {
        const transactionModel = await TransactionModel.create({
            id: transation.id.value,
            amount: transation.amount,
            orderId: transation.orderId,
            status: transation.status,
            createdAt: transation.createdAt,
            updatedAt: transation.updatedAt,
        })

        return new Transaction({
            id: new Id(transactionModel.id),
            amount: transactionModel.amount,
            orderId: transactionModel.orderId,
            status: transactionModel.status,
            createdAt: transactionModel.createdAt,
            updatedAt: transactionModel.updatedAt,
        });
    }
}