import { Id } from "@app/module/@shared/value-objects/Id";
import { Client } from "@app/module/client-adm/entity/client.entity";
import { ClientGatewayInterface } from "@app/module/client-adm/gateway/client.gateway";
import { ClientModel } from "@app/module/client-adm/repository/client.model";

export class ClientAdmRepository implements ClientGatewayInterface {

    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }

    async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({ where: { id: id } });

        if (!client) {
            throw new Error('Client not found');
        }

        return new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address,
            created_at: client.createdAt,
            updated_at: client.updatedAt
        });
    }
}