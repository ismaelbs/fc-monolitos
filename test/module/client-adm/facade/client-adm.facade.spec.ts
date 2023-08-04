import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "@app/module/client-adm/repository/client.model";
import { ClientAdmFacadeFactory } from "@app/module/client-adm/fatory/client-adm.facade.factory";

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

        const clientAdmFacade = ClientAdmFacadeFactory.create();
        const client = await clientAdmFacade.addClient(clientProps);

        expect(client).not.toBeNull();
        expect(client.id).not.toBeNull();
        expect(client.name).toBe(clientProps.name);
        expect(client.email).toEqual(clientProps.email);
        expect(client.address).toEqual(clientProps.address);
    })


    it('should find a client via facade', async () => {
        const clientAdmFacade = ClientAdmFacadeFactory.create();

        const clientProps = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            address: 'John Doe address',
        };

        const output = await clientAdmFacade.addClient(clientProps);
        
        const client = await clientAdmFacade.find({
            id: output.id
        });

        expect(client).not.toBeNull();
        expect(client.id).toBe(output.id);
        expect(client.name).toBe(clientProps.name);
        expect(client.email).toBe(clientProps.email);
        expect(client.address).toBe(clientProps.address);
    })

    afterEach(async () => {
        await sequelize.close();
    });
})