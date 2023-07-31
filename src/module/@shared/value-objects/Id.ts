import { v4 as uuidv4 } from "uuid";
import { ValueObject } from "./value-object.interface";

export class Id implements ValueObject {
  private readonly _value: string;

  constructor(value: string = uuidv4()) {
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }
}