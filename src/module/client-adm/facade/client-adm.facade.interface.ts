import { AddClientInputFacadeDto, AddClientOutputFacadeDto } from "@app/module/client-adm/facade/client-adm.dto";

export interface ClientAdmFacadeInterface {
    addClient(input: AddClientInputFacadeDto): Promise<AddClientOutputFacadeDto>;
}