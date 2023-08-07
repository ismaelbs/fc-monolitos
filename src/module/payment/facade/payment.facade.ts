import { UseCaseInterface } from "@app/module/@shared/usecase/usecase-interface";
import { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "@app/module/payment/facade/payment.facade.dto";
import { PaymentFacadeInterface } from "@app/module/payment/facade/payment.facade.interface";

export class PaymentFacade implements PaymentFacadeInterface {
    private processPayment: UseCaseInterface<PaymentFacadeInputDto, PaymentFacadeOutputDto>;
    constructor(processPayment: UseCaseInterface<PaymentFacadeInputDto, PaymentFacadeOutputDto>) {
        this.processPayment = processPayment;
    }
    async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        const transaction = await this.processPayment.execute(input);
        return {
            transactionId: transaction.transactionId,
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        };
    }

}