import { InvoiceItemModel } from "@app/module/invoice/repository/invoice-item.model";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'invoice', timestamps: false})
export class InvoiceModel extends Model {
    @Column({ allowNull: false, primaryKey: true, type: DataType.UUID })
    id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @Column({ allowNull: false, type: DataType.STRING })
    document: string;

    @Column({ allowNull: false, type: DataType.STRING })
    street: string;

    @Column({ allowNull: false, type: DataType.STRING })
    number: string;

    @Column({ allowNull: false, type: DataType.STRING })
    complement: string;

    @Column({ allowNull: false, type: DataType.STRING })
    city: string;

    @Column({ allowNull: false, type: DataType.STRING })
    state: string;

    @Column({ allowNull: false, type: DataType.STRING })
    zipCode: string;

    @HasMany(() => InvoiceItemModel)
    items: InvoiceItemModel[];

    @Column({ allowNull: false, type: DataType.DATE })
    createdAt: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updatedAt: Date;
}