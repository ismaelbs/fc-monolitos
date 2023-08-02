import { AggregateRoot } from "@app/module/@shared/domain/aggregate-root.interface";
import { Entity } from "@app/module/@shared/domain/entity";
import { Id } from "@app/module/@shared/value-objects/Id";

type ProductProps = {
    id: Id;
    name: string;
    description: string;
    salesPrice: number;
}

export class Product extends Entity implements AggregateRoot {
    private _name: string
    private _description: string
    private _salesPrice: number
    constructor(props: ProductProps) {
        super(props.id)
        this._name = props.name
        this._description = props.description
        this._salesPrice = props.salesPrice
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get salesPrice() {
        return this._salesPrice
    }
}