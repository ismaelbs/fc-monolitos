import { AggregateRoot } from "@app/module/@shared/domain/aggregate-root.interface";
import { Entity } from "@app/module/@shared/domain/entity";
import { Id } from "@app/module/@shared/value-objects/Id";

type ClientProps = {
    name: string;
    email: string;
    address: string;
    id?: Id;
    created_at?: Date;
    updated_at?: Date;
}

export class Client extends Entity implements AggregateRoot {
    private _name: string;
    private _email: string;
    private _address: string;

    constructor(props: ClientProps) {
        super( props.id, props.created_at, props.updated_at);
        this._name = props.name;
        this._email = props.email;
        this._address = props.address;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get address(): string {
        return this._address;
    }

}