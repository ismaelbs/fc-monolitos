import { Entity } from "@app/module/@shared/domain/entity";
import { Id } from "@app/module/@shared/value-objects/Id"

type TransactionProps = {
    id?: Id,
    amount: number,
    orderId: string,
    status?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export class Transaction extends Entity {
    private _amount: number;
    private _orderId: string;
    private _status: string;

    constructor(props: TransactionProps) {
        super(props.id);
        this._amount = props.amount;
        this._orderId = props.orderId;
        this._status = props.status || 'pending';
        this.validate();
    }

    validate() {
        if (this._amount <= 0) {
            throw new Error('Invalid amount');
        }
    }

    approve() {
        this._status = 'approved';
    }

    decline() {
        this._status = 'declined';
    }

    process() {
        if (this._amount > 100) {
            this.approve();
        } else {
            this.decline();
        }
    }

    get amount() {
        return this._amount;
    }

    get orderId() {
        return this._orderId;
    }

    get status() {
        return this._status;
    }

}