import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { Address } from "@app/module/@shared/value-objects/address";
import { Invoice } from "@app/module/invoice/domain/invoice";
import { InvoiceItems } from "@app/module/invoice/domain/invoice-items";
import { InvoiceGatewayInterface } from "@app/module/invoice/gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "@app/module/invoice/usecase/generate-invoice/generate-invoice.usecase.dto";

export class GenerateInvoiceUsecase implements UseCaseInterface<GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto> {
    constructor(private _invoiceGateway: InvoiceGatewayInterface) {}

    public async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoiceEntity = new Invoice(
            {
                name: input.name,
                document: input.document,
                address: new Address({
                    street: input.street,
                    number: input.number,
                    complement: input.complement,
                    city: input.city,
                    state: input.state,
                    zipCode: input.zipCode
                }),
                items: input.items.map(item => { return new InvoiceItems({ name: item.name, price: item.price }); }),
            }
        );
        const invoice = await this._invoiceGateway.generate(invoiceEntity);
        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map(item => ({
                id: item.id.value,
                name: item.name,
                price: item.price
            })),
            total: invoice.calculateTotal()
        }
    }
}