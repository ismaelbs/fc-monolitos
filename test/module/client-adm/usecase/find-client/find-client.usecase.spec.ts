import { FindClientUseCase } from "@app/module/client-adm/usecase/find-client/find-client.usecase";
import { client, clientRepositoryMock } from "@test/module/client-adm/mocks/client-repository.mock";
import { describe, expect, it } from "vitest";

describe("FindClientUseCase", () => {
    it("should find a client by id", async () => {
        const clientRepository = clientRepositoryMock();
        const findClientUseCase = new FindClientUseCase(clientRepository);
        const input = {
            id: "123",
        }

        const output = await findClientUseCase.execute(input);

        expect(clientRepository.find).toBeCalled();
        expect(output.name).toBe(client.name);
        expect(output.email).toBe(client.email);
        expect(output.address).toBe(client.address);
    });
});