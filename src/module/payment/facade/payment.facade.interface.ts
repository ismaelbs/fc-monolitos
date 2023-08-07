import { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "@app/module/payment/facade/payment.facade.dto";

export interface PaymentFacadeInterface {
    process(input:PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}