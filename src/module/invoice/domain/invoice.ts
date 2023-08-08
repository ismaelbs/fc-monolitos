import { Entity } from "@app/module/@shared/domain/entity";
import { Id } from "@app/module/@shared/value-objects/Id";
import { Address } from "@app/module/@shared/value-objects/address";
import { InvoiceItems } from "@app/module/invoice/domain/invoice-items";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items?: InvoiceItems[];
}

export class Invoice extends Entity {
    private _name: string
    private _document: string
    private _address: Address
    private _items: InvoiceItems[]

    constructor(props: InvoiceProps) {
        super(props.id)
        this._name = props.name
        this._document = props.document
        this._address = props.address
        this._items = props.items || []
    }

    public get name(): string {
        return this._name
    }

    public get document(): string {
        return this._document
    }

    public get address(): Address {
        return this._address
    }

    public get items(): InvoiceItems[] {
        return this._items
    }

    public calculateTotal(): number {
        return this._items.reduce((total, item) => total + item.price, 0)
    }
}