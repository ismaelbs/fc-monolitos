import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { AddClientInputFacadeDto, AddClientOutputFacadeDto } from "@app/module/client-adm/facade/client-adm.dto";
import { ClientAdmFacadeInterface } from "@app/module/client-adm/facade/client-adm.facade.interface";
import { AddClientInputUseCaseDto, AddClientOutUseCaseDto } from "@app/module/client-adm/usecase/add-client/add-client.dto";

export class ClientAdmFacade implements ClientAdmFacadeInterface {
    private addClientUseCase: UseCaseInterface<AddClientInputUseCaseDto, AddClientOutUseCaseDto>;
    constructor(addClientUsecase: UseCaseInterface<AddClientInputUseCaseDto, AddClientOutUseCaseDto>) {
        this.addClientUseCase = addClientUsecase;
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