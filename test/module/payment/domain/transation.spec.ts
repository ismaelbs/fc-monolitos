import { Transaction } from "@app/module/payment/domain/transaction";
import { describe, expect, it } from "vitest";

describe('Transaction', () => {
    it('should create a transaction', () => {
        const transaction = new Transaction({
            amount: 100,
            orderId: '123'
        })

        expect(transaction).not.toBeNull();
        expect(transaction.id).not.toBeNull();
        expect(transaction.amount).toBe(100);
        expect(transaction.orderId).toBe('123');
    })

    it('should throw an error if amount is lower or equal than zero', () => {
        expect(() => {
            new Transaction({
                amount: 0,
                orderId: '123'
            })
        }).toThrowError('Invalid amount');
    })

    it('should approve a transaction', () => {
        const transaction = new Transaction({
            amount: 100,
            orderId: '123'
        })

        transaction.approve();

        expect(transaction.status).toBe('approved');
    })

    it('should decline a transaction', () => {
        const transaction = new Transaction({
            amount: 100,
            orderId: '123'
        })

        transaction.decline();

        expect(transaction.status).toBe('declined');
    })

    it('should process a transaction', () => {
        const transaction = new Transaction({
            amount: 200,
            orderId: '123'
        })

        transaction.process();

        expect(transaction.status).toBe('approved');
    })

    it('should decline a transaction if amount is lower than 100', () => {
        const transaction = new Transaction({
            amount: 99,
            orderId: '123'
        })

        transaction.process();

        expect(transaction.status).toBe('declined');
    })
})