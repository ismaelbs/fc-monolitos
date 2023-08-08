import { FindInvoiceUsecase } from "@app/module/invoice/usecase/find-invoice/find-invoice.usecase";
import { InvoiceGatewayMock } from "@test/module/invoice/mocks/invoice-gateway.mock";
import { describe, expect, it } from "vitest";

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
        expect(result.createdAt).toBeDefined();
    })
})