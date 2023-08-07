import { PaymentFacade } from "@app/module/payment/facade/payment.facade";
import { TransactionRepository } from "@app/module/payment/repository/transation.repository";
import { ProcessPaymentUsecase } from "@app/module/payment/usecase/process-payment/process-payment.usecase";

export class PaymentFacadeFactory {
    static create() {
        const repository = new TransactionRepository();
        const usecase = new ProcessPaymentUsecase(repository);
        return new PaymentFacade(usecase);
    }
}