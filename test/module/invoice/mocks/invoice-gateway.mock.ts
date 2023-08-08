import { Id } from "@app/module/@shared/value-objects/Id";
import { Address } from "@app/module/@shared/value-objects/address";
import { Invoice } from "@app/module/invoice/domain/invoice";
import { InvoiceItems } from "@app/module/invoice/domain/invoice-items";
import { InvoiceGatewayInterface } from "@app/module/invoice/gateway/invoice.gateway";

const invoice = new Invoice(
    {
        id: new Id("123"),
        name: "John Doe",
        document: "12345678900",
        address: new Address({
            street: "Rua 1",
            number: "123",
            complement: "Casa",
            city: "São Paulo",
            state: "SP",
            zipCode: "12345678",
        }),
        items: [
            new InvoiceItems({
                id: new Id("1"),
                name: "Item 1",
                price: 10
            }),
            new InvoiceItems({
                id: new Id("2"),
                name: "Item 2",
                price: 20
            }),
            new InvoiceItems({
                id: new Id("3"),
                name: "Item 3",
                price: 30
            }),
        ]
    }
);
export const InvoiceGatewayMock: InvoiceGatewayInterface = {
    find: () => Promise.resolve(invoice),
    generate: () => Promise.resolve(invoice)
}