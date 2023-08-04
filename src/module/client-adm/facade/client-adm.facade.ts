import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { AddClientInputFacadeDto, AddClientOutFacadeDto } from "@app/module/client-adm/facade/client-adm.dto";
import { AddClientInputUseCaseDto, AddClientOutUseCaseDto } from "@app/module/client-adm/usecase/add-client/add-client.dto";

export class ClientAdmFacade {
    private addClientUseCase: UseCaseInterface<AddClientInputUseCaseDto, AddClientOutUseCaseDto>;
    constructor(addClientUsecase: UseCaseInterface<AddClientInputUseCaseDto, AddClientOutUseCaseDto>) {
        this.addClientUseCase = addClientUsecase;
    }

    async addClient(props: AddClientInputFacadeDto): Promise<AddClientOutFacadeDto> {
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