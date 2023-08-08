import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { InvoiceGatewayInterface } from "@app/module/invoice/gateway/invoice.gateway";

type FindInvoiceUsecaseInputDto = {
    id: string;
}

type FindInvoiceUsecaseOutputDto = {
    id: string;
    name: string;
    document: string;
    address: {
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zipCode: string;
    };
    items: {
      id: string;
      name: string;
      price: number;
    }[];
    total: number;
    createdAt: Date;
}

export class FindInvoiceUsecase implements UseCaseInterface<FindInvoiceUsecaseInputDto, FindInvoiceUsecaseOutputDto> {
    private readonly _invoiceGateway: InvoiceGatewayInterface;

    constructor(invoiceGateway: InvoiceGatewayInterface) {
        this._invoiceGateway = invoiceGateway
    }

    public async execute(input: FindInvoiceUsecaseInputDto): Promise<FindInvoiceUsecaseOutputDto> {
        const invoice = await this._invoiceGateway.find(input.id)
        return {
            id: invoice.id.value,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode
            },
            items: invoice.items.map(item => {
                return {
                    id: item.id.value,
                    name: item.name,
                    price: item.price
                }
            }),
            total: invoice.items.reduce((total, item) => total + item.price, 0),
            createdAt: invoice.createdAt
        }
    }
}