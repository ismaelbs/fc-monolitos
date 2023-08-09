import { Id } from "@app/module/@shared/value-objects/Id";
import { Address } from "@app/module/@shared/value-objects/address";
import { Invoice } from "@app/module/invoice/domain/invoice";
import { InvoiceItems } from "@app/module/invoice/domain/invoice-items";
import { InvoiceGatewayInterface } from "@app/module/invoice/gateway/invoice.gateway";
import { InvoiceItemModel } from "@app/module/invoice/repository/invoice-item.model";
import { InvoiceModel } from "@app/module/invoice/repository/invoice.model";

export class InvoiceRepository implements InvoiceGatewayInterface {
    async find(id: string): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.findOne({ include: [InvoiceItemModel], where: { id }})
        return new Invoice({
            id: new Id(invoiceModel.id),
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: new Address({
                street: invoiceModel.street,
                number: invoiceModel.number,
                complement: invoiceModel.complement,
                city: invoiceModel.city,
                state: invoiceModel.state,
                zipCode: invoiceModel.zipCode,
            }),
            items: invoiceModel.items.map(item => new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            })),
            createdAt: invoiceModel.createdAt,
            updatedAt: invoiceModel.updatedAt
        })
    }
    async generate(invoice: Invoice): Promise<Invoice> {
        await InvoiceModel.create({
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }))
        },{
            include: [InvoiceItemModel],
        });

        return invoice;
    }
}