import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { Client } from "@app/module/client-adm/entity/client.entity";
import { ClientGatewayInterface } from "@app/module/client-adm/gateway/client.gateway";
import { AddClientInputUseCaseDto, AddClientOutUseCaseDto } from "@app/module/client-adm/usecase/add-client/add-client.dto";

export class AddClientUseCase implements UseCaseInterface<AddClientInputUseCaseDto, AddClientOutUseCaseDto> {
    private _clientGateway: ClientGatewayInterface;

    constructor(clientGateway: ClientGatewayInterface) {
        this._clientGateway = clientGateway;
    }
    
    async execute(input: AddClientInputUseCaseDto): Promise<AddClientOutUseCaseDto> {
        const client = new Client({
            name: input.name,
            email: input.email,
            address: input.address
        }, input.id);
        await this._clientGateway.add(client);
        return {
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.created_at,
            updatedAt: client.updated_at
        }
    }
}
