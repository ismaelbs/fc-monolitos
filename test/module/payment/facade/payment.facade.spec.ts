import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "@app/module/payment/repository/transation.model";
import { PaymentFacadeFactory } from "@app/module/payment/factory/payment-facade.factory";

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
        const facade = PaymentFacadeFactory.create();

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