import { Transaction } from "@app/module/payment/domain/transaction";
import { TransactionModel } from "@app/module/payment/repository/transation.model";
import { TransactionRepository } from "@app/module/payment/repository/transation.repository";
import { Sequelize } from "sequelize-typescript";
import { describe, it, beforeEach, expect, afterEach } from "vitest";
let sequelize: Sequelize;

describe('Transaction Repository', () => {
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
            models: [TransactionModel]
        });
        await sequelize.sync();
    });
    
    it('should save a transation', async () => {
        const transation = new Transaction({
            amount: 100,
            orderId: '123',
        });
        const transactionRepository = new TransactionRepository();

        const result = await transactionRepository.save(transation);
        
        expect(result).not.toBeNull();
        expect(result.id.value).not.toBeNull();
        expect(result.amount).toBe(transation.amount);
        expect(result.orderId).toBe(transation.orderId);
        expect(result.status).toBe(transation.status);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
    })

    afterEach(async () => {
        await sequelize.close();
    })
});