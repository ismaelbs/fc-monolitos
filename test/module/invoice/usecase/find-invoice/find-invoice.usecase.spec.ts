import { Id } from "@app/module/@shared/value-objects/Id";
import { Address } from "@app/module/@shared/value-objects/address";
import { Invoice } from "@app/module/invoice/domain/invoice";
import { InvoiceItems } from "@app/module/invoice/domain/invoice-items";
import { InvoiceGatewayInterface } from "@app/module/invoice/gateway/invoice.gateway";
import { FindInvoiceUsecase } from "@app/module/invoice/usecase/find-invoice/find-invoice.usecase";
import { describe, expect, it } from "vitest";

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
const InvoiceGatewayMock: InvoiceGatewayInterface = {
    find: () => Promise.resolve(invoice),
}

describe("FindInvoiceUsecase", () => {
    it("should find invoice", async () => {
        const sut = new FindInvoiceUsecase(InvoiceGatewayMock)

        const result = await sut.execute({ id: "123" });

        expect(result).toBeDefined();
        expect(result.id).toBe("123");
        expect(result.name).toBe("John Doe");
        expect(result.document).toBe("12345678900");
        expect(result.address.street).toBe("Rua 1");
        expect(result.address.number).toBe("123");
        expect(result.address.complement).toBe("Casa");
        expect(result.address.city).toBe("São Paulo");
        expect(result.address.state).toBe("SP");
        expect(result.address.zipCode).toBe("12345678");
        expect(result.items.length).toBe(3);
        expect(result.items[0].id).toBe("1");
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10);
        expect(result.items[1].id).toBe("2");
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20);
        expect(result.items[2].id).toBe("3");
        expect(result.items[2].name).toBe("Item 3");
        expect(result.items[2].price).toBe(30);
        expect(result.total).toBe(60);
        expect(result.createdAt).toBe(invoice.createdAt);
    })
})