import { Id } from "@app/module/@shared/value-objects/Id";
import { Address } from "@app/module/@shared/value-objects/address";
import { Invoice } from "@app/module/invoice/domain/invoice";
import { InvoiceItems } from "@app/module/invoice/domain/invoice-items";
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

describe("FindInvoiceUsecase", () => {
    it("should calculate an invoice total", async () => {
        const result = invoice.calculateTotal();
        expect(result).toBe(60);
    }
)});