import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "@app/module/payment/repository/transation.model";
import { ProcessPaymentUsecase } from "@app/module/payment/usecase/process-payment/process-payment.usecase";
import { PaymentFacade } from "@app/module/payment/facade/payment.facade";
import { TransactionRepository } from "@app/module/payment/repository/transation.repository";

let sequelize: Sequelize;

describe('Payment Facade', () => {

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

    it('should create a transaction via facade', async () => {
        const repository = new TransactionRepository();
        const usecase = new ProcessPaymentUsecase(repository);
        const facade = new PaymentFacade(usecase);

        const output = await facade.process({
            orderId: '123',
            amount: 100
        })

        expect(output).not.toBeNull();
        expect(output.transactionId).not.toBeNull();
        expect(output.orderId).toBe('123');
        expect(output.amount).toBe(100);
        expect(output.status).toBe('approved');
    })

    afterEach(async () => {
        await sequelize.close();
    });
})