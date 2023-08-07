import { Transaction } from "@app/module/payment/domain/transaction";
import { ProcessPaymentUsecase } from "@app/module/payment/usecase/process-payment/process-payment.usecase";
import { describe, expect, it, vi } from "vitest";

const transationAproved = new Transaction({
    amount: 100,
    orderId: '123',
    status: 'approved'
})

const transationAprovedGatewayMock = {
    save: vi.fn().mockReturnValue(Promise.resolve(transationAproved))
}

const transationDeclined = new Transaction({
    amount: 100,
    orderId: '123',
    status: 'declined'
})

const transationDeclinedGatewayMock = {
    save: vi.fn().mockReturnValue(Promise.resolve(transationDeclined))
}

describe('Process payment use case', () => {
    it('should aprove a transaction', async () => {
        const processPaymentUsecase = new ProcessPaymentUsecase(transationAprovedGatewayMock);

        const result = await processPaymentUsecase.execute(transationAproved);

        expect(result.transactionId).toBe(transationAproved.id.value);
        expect(result.status).toBe('approved');
        expect(transationAprovedGatewayMock.save).toHaveBeenCalled();
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe('123');
    })
})

describe('Process payment use case', () => {
    it('should decline a transaction', async () => {
        const processPaymentUsecase = new ProcessPaymentUsecase(transationDeclinedGatewayMock);

        const result = await processPaymentUsecase.execute(transationDeclined);

        expect(result.transactionId).toBe(transationDeclined.id.value);
        expect(result.status).toBe('declined');
        expect(transationDeclinedGatewayMock.save).toHaveBeenCalled();
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe('123');
    })
})