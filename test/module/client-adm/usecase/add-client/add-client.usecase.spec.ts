import { AddClientUseCase } from "@app/module/client-adm/usecase/add-client/add-client.usecase";
import { describe, expect, it, vi } from "vitest";

const clientRepositoryMock = () => ({
    add: vi.fn()
})

describe("AddClientUseCase", () => {
    it("should add a client", async () => {
        const clientRepository = clientRepositoryMock();
        const addClientUseCase = new AddClientUseCase(clientRepository);
        const input = {
            name: "John Doe",
            email: "john.doe@example.com",
            address: "Av. Paulista, 1000"
        }

        const output = await addClientUseCase.execute(input);

        expect(clientRepository.add).toBeCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.email).toBe(input.email);
        expect(output.address).toBe(input.address);
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });
});