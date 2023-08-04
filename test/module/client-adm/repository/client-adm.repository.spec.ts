import { Client } from "@app/module/client-adm/entity/client.entity";
import { ClientAdmRepository } from "@app/module/client-adm/repository/client-adm.repository";
import { ClientModel } from "@app/module/client-adm/repository/client.model";
import { Sequelize } from "sequelize-typescript";
import { describe, it, beforeEach, expect, afterEach } from "vitest";
let sequelize: Sequelize;

describe('Client Repository', () => {
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
    
    it('should create a client', async () => {
        const clientProps = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            address: 'Rua 1',
        }
        const client = new Client(clientProps);

        
        
        const clientAdmRepository = new ClientAdmRepository();
        await clientAdmRepository.add(client);
        const foundClient = await ClientModel.findOne({ where: { id: client.id.value } });

        expect(foundClient).not.toBeNull();
        expect(client.id.value).toEqual(foundClient?.id);
        expect(clientProps.name).toEqual(foundClient?.name);
        expect(clientProps.email).toEqual(foundClient?.email);
        expect(clientProps.address).toEqual(foundClient?.address);
    })

    it('should fin a client', async () => {
        const clientProps = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            address: 'Rua 1',
        }
    
        const client = new Client(clientProps);
        const clientAdmRepository = new ClientAdmRepository();
        await clientAdmRepository.add(client);
        const foundClient = await clientAdmRepository.find(client.id.value);

        expect(foundClient).not.toBeNull();
        expect(client.id.value).toBe(foundClient.id.value);
        expect(clientProps.name).toEqual(foundClient.name);
        expect(clientProps.email).toEqual(foundClient.email);
        expect(clientProps.address).toEqual(foundClient.address);
    })

    afterEach(async () => {
        await sequelize.close();
    })
});