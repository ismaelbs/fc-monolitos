import { Transaction } from "@app/module/payment/domain/transaction";

export interface TransactionGatewayInterface {
    save(transation: Transaction): Promise<Transaction>;
}