import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { AddClientInputFacadeDto, AddClientOutputFacadeDto, FindClientInputFacadeDto, FindClientOutputFacadeDto } from "@app/module/client-adm/facade/client-adm.dto";
import { ClientAdmFacadeInterface } from "@app/module/client-adm/facade/client-adm.facade.interface";
import { AddClientInputUseCaseDto, AddClientOutUseCaseDto } from "@app/module/client-adm/usecase/add-client/add-client.dto";
import { FindClientInputUseCaseDto, FindClientOutUseCaseDto } from "@app/module/client-adm/usecase/find-client/find-client.dto";

export class ClientAdmFacade implements ClientAdmFacadeInterface {
    private addClientUseCase: UseCaseInterface<AddClientInputUseCaseDto, AddClientOutUseCaseDto>;
    private findClientUseCase: UseCaseInterface<FindClientInputUseCaseDto, FindClientOutUseCaseDto>;
    constructor(
        addClientUsecase: UseCaseInterface<AddClientInputUseCaseDto, AddClientOutUseCaseDto>,
        findClientUseCase: UseCaseInterface<FindClientInputUseCaseDto, FindClientOutUseCaseDto>
    ) {
        this.addClientUseCase = addClientUsecase;
        this.findClientUseCase = findClientUseCase;
    }

    async find(input: FindClientInputFacadeDto): Promise<FindClientOutputFacadeDto> {
        const client = await this.findClientUseCase.execute({
            id: input.id
        })

        if (!client) {
            throw new Error('Client not found');
        }

        return {
            id: client.id,
            name: client.name,
            email: client.email,
            address: client.address
        }
    }

    async addClient(props: AddClientInputFacadeDto): Promise<AddClientOutputFacadeDto> {
        const output = await this.addClientUseCase.execute({
            name: props.name,
            email: props.email,
            address: props.address,
        });

        return {
            id: output.id,
            name: output.name,
            email: output.email,
            address: output.address,
        }
    }
}