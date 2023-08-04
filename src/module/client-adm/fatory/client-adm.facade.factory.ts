import { ClientAdmFacade } from "@app/module/client-adm/facade/client-adm.facade";
import { ClientAdmRepository } from "@app/module/client-adm/repository/client-adm.repository";
import { AddClientUseCase } from "@app/module/client-adm/usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "@app/module/client-adm/usecase/find-client/find-client.usecase";

export class ClientAdmFacadeFactory {
    public static create() {
        const clientAdmRepository = new ClientAdmRepository();
        const addUsecase = new AddClientUseCase(clientAdmRepository);
        const findUsecase = new FindClientUseCase(clientAdmRepository);
        return new ClientAdmFacade(addUsecase, findUsecase);
    }
}