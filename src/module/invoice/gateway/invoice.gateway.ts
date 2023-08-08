import { Invoice } from "@app/module/invoice/domain/invoice";

export interface InvoiceGatewayInterface {
    find(id: string): Promise<Invoice>
    generate(invoice: Invoice): Promise<Invoice>
}