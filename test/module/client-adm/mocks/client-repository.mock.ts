import { Client } from "@app/module/client-adm/entity/client.entity";
import { vi } from "vitest";

export const client = new Client({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "Av. Paulista, 1000",
}, "123");

export const clientRepositoryMock = () => ({
    add: vi.fn(),
    find: vi.fn().mockResolvedValue(Promise.resolve(client))
})