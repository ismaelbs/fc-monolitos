import { Id } from "../value-objects/Id";

export class Entity {
    private createdAt: Date;
    private updatedAt: Date;
    constructor(private _id: Id) {
        this._id = _id;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    get id(): Id {
        return this._id;
    }

    get created_at(): Date {
        return this.createdAt;
    }

    set created_at(value: Date) {
        this.createdAt = value;
    }

    get updated_at(): Date {
        return this.updatedAt;
    }
}