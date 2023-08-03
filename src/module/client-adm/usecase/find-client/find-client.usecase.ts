import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { ClientGatewayInterface } from "@app/module/client-adm/gateway/client.gateway";
import { FindClientInputUseCaseDto, FindClientOutUseCaseDto } from "@app/module/client-adm/usecase/find-client/find-client.dto";

export class FindClientUseCase implements UseCaseInterface<FindClientInputUseCaseDto, FindClientOutUseCaseDto> {
    constructor(private clientRepository: ClientGatewayInterface) { }

    async execute(input: FindClientInputUseCaseDto): Promise<FindClientOutUseCaseDto> {
        const client = await this.clientRepository.find(input.id);
        return {
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
        };
    }
}