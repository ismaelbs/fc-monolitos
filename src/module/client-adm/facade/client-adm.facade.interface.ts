import { AddClientInputFacadeDto, AddClientOutputFacadeDto, FindClientInputFacadeDto, FindClientOutputFacadeDto } from "@app/module/client-adm/facade/client-adm.dto";

export interface ClientAdmFacadeInterface {
    addClient(input: AddClientInputFacadeDto): Promise<AddClientOutputFacadeDto>;
    find(input: FindClientInputFacadeDto): Promise<FindClientOutputFacadeDto>;
}