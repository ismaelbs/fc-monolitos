import { InvoiceFacade } from "@app/module/invoice/facade/invoice.facade";
import { InvoiceRepository } from "@app/module/invoice/repository/invoice.repository";
import { FindInvoiceUsecase } from "@app/module/invoice/usecase/find-invoice/find-invoice.usecase";
import { GenerateInvoiceUsecase } from "@app/module/invoice/usecase/generate-invoice/generate-invoice.usecase";

export class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepository();
        const findInvoiceUsecase = new FindInvoiceUsecase(repository);
        const generateInvoiceUsecase = new GenerateInvoiceUsecase(repository);
        return new InvoiceFacade({
            findInvoiceUsecase,
            generateInvoiceUsecase
        });
    }
}