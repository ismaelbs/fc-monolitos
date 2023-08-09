import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto, InvoiceFacadeInterface } from "@app/module/invoice/facade/invoice.facade.interface";
import { FindInvoiceUsecaseInputDto, FindInvoiceUsecaseOutputDto } from "@app/module/invoice/usecase/find-invoice/find-invoice.dto";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "@app/module/invoice/usecase/generate-invoice/generate-invoice.usecase.dto";

type InvoiceFacadeDependencies = {
    generateInvoiceUsecase: UseCaseInterface<GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto>,
    findInvoiceUsecase: UseCaseInterface<FindInvoiceUsecaseInputDto, FindInvoiceUsecaseOutputDto>,
}

export class InvoiceFacade implements InvoiceFacadeInterface {

    constructor(private dependencies: InvoiceFacadeDependencies){}

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        const result = await this.dependencies.generateInvoiceUsecase.execute(input);
        return result;
    }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        const result = await this.dependencies.findInvoiceUsecase.execute(input);
        return result;
    }
}