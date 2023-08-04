import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "@app/module/client-adm/repository/client.model";
import { AddClientUseCase } from "@app/module/client-adm/usecase/add-client/add-client.usecase";
import { ClientAdmRepository } from "@app/module/client-adm/repository/client-adm.repository";
import { ClientAdmFacade } from "@app/module/client-adm/facade/client-adm.facade";

let sequelize: Sequelize;

describe('ProductClientAdm', () => {

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
            models: [ClientModel]
        });
        await sequelize.sync();
    });

    it('should create a client via facade', async () => {
        const clientProps = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            address: 'John Doe address',
        };

        const clientAdmRepository = new ClientAdmRepository();
        const usecase = new AddClientUseCase(clientAdmRepository);
        const clientAdmFacade = new ClientAdmFacade(usecase);
        const client = await clientAdmFacade.addClient(clientProps);

        expect(client).not.toBeNull();
        expect(client.id).not.toBeNull();
        expect(client.name).toBe(clientProps.name);
        expect(client.email).toEqual(clientProps.email);
        expect(client.address).toEqual(clientProps.address);
    })

    afterEach(async () => {
        await sequelize.close();
    });
})