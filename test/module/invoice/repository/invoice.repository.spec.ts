
import { InvoiceItemModel } from "@app/module/invoice/repository/invoice-item.model";
import { InvoiceModel } from "@app/module/invoice/repository/invoice.model";
import { InvoiceRepository } from "@app/module/invoice/repository/invoice.repository";
import { invoice } from "@test/module/invoice/mocks/invoice-gateway.mock";

import { Sequelize } from "sequelize-typescript";
import { describe, it, beforeEach, expect, afterEach } from "vitest";
let sequelize: Sequelize;

describe('Invoice Repository', () => {
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
    
    it('should generete an invoice', async () => {
        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.generate(invoice);
        const foundInvoice = await InvoiceModel.findOne({ include: [InvoiceItemModel], where: { id: invoice.id.value }});
        expect(foundInvoice).not.toBeNull();
        expect(foundInvoice?.id).toBe(invoice.id.value);
    })

    it('should find an invoice', async () => {
        const invoiceRepository = new InvoiceRepository();
        await invoiceRepository.generate(invoice);
        const foundInvoice = await invoiceRepository.find(invoice.id.value);
        expect(foundInvoice).not.toBeNull();
        expect(foundInvoice?.id.value).toBe(invoice.id.value);
        expect(foundInvoice?.items.length).toBe(invoice.items.length);
    })

    afterEach(async () => {
        await sequelize.close();
    })
});