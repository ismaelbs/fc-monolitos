import { InvoiceFacade } from "@app/module/invoice/facade/invoice.facade";
import { InvoiceItemModel } from "@app/module/invoice/repository/invoice-item.model";
import { InvoiceModel } from "@app/module/invoice/repository/invoice.model";
import { InvoiceRepository } from "@app/module/invoice/repository/invoice.repository";
import { FindInvoiceUsecase } from "@app/module/invoice/usecase/find-invoice/find-invoice.usecase";
import { GenerateInvoiceUsecase } from "@app/module/invoice/usecase/generate-invoice/generate-invoice.usecase";
import { Sequelize } from "sequelize-typescript";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

let sequelize: Sequelize;

describe('Invoice Facade', () => {
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
            models: [InvoiceModel, InvoiceItemModel]
        });
        await sequelize.sync();
    });

    it('should create an invoice and find via facade', async () => {
        const repository = new InvoiceRepository();
        const findInvoiceUsecase = new FindInvoiceUsecase(repository);
        const generateInvoiceUsecase = new GenerateInvoiceUsecase(repository);
        const invoiceFacade = new InvoiceFacade({
            findInvoiceUsecase,
            generateInvoiceUsecase
        });

        const invoiceGenerated = await invoiceFacade.generate({
            city: 'São Paulo',
            complement: 'Casa',
            document: '12345678901',
            name: 'invoice',
            number: '123',
            state: 'SP',
            street: 'Rua',
            zipCode: '12345678',
            items: []
        })

        const invoice = await invoiceFacade.find({ id: invoiceGenerated.id });

        expect(invoice).not.toBeNull();
        expect(invoice?.id).toBe(invoiceGenerated.id);
        expect(invoice?.document).toBe('12345678901');
        expect(invoice?.address.city).toBe('São Paulo');
        expect(invoice?.address.complement).toBe('Casa');
        expect(invoice?.address.state).toBe('SP');
        expect(invoice?.address.street).toBe('Rua');
        expect(invoice?.address.zipCode).toBe('12345678');
    });

    afterEach(async () => {
        await sequelize.close();
    });
})