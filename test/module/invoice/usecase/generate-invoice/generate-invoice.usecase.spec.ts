import { Id } from "@app/module/@shared/value-objects/Id";
import { GenerateInvoiceUsecase } from "@app/module/invoice/usecase/generate-invoice/generate-invoice.usecase";
import { InvoiceGatewayMock } from "@test/module/invoice/mocks/invoice-gateway.mock";
import { describe, expect, it } from "vitest";

describe("GenerateInvoiceUsecase", () => {
    it("should generate an invoice", async () => {
        const sut = new GenerateInvoiceUsecase(InvoiceGatewayMock);

        const result = await sut.execute({ 
            name: "John Doe",
            document: "12345678900",
            street: "Rua 1",
            number: "123",
            complement: "Casa",
            city: "São Paulo",
            state: "SP",
            zipCode: "12345678",
            items: [
                {
                    id: new Id().value,
                    name: "Item 1",
                    price: 10
                },
                {
                    id: new Id().value,
                    name: "Item 2",
                    price: 20
                },
                {
                    id: new Id().value,
                    name: "Item 3",
                    price: 30
                },
            ]
         });

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.name).toBe("John Doe");
        expect(result.document).toBe("12345678900");
        expect(result.street).toBe("Rua 1");
        expect(result.number).toBe("123");
        expect(result.complement).toBe("Casa");
        expect(result.city).toBe("São Paulo");
        expect(result.state).toBe("SP");
        expect(result.zipCode).toBe("12345678");
        expect(result.items.length).toBe(3);
        expect(result.items[0].id).toBeDefined();
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(10);
        expect(result.items[1].id).toBeDefined();
        expect(result.items[1].name).toBe("Item 2");
        expect(result.items[1].price).toBe(20);
        expect(result.items[2].id).toBeDefined();
        expect(result.items[2].name).toBe("Item 3");
        expect(result.items[2].price).toBe(30);
        expect(result.total).toBe(60);
    })
})