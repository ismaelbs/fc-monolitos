import { Entity } from "@app/module/@shared/domain/entity";
import { Id } from "@app/module/@shared/value-objects/Id";

type InvoiceItemProps = {
    id?: Id;
    name: string;
    price: number;
}

export class InvoiceItems extends Entity {
    private _name: string
    private _price: number

    constructor(props: InvoiceItemProps) {
        super(props.id)
        this._name = props.name
        this._price = props.price
    }

    get name(): string {
        return this._name
    }

    get price(): number {
        return this._price
    }
}