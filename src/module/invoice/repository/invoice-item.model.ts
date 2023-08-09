import { InvoiceModel } from "@app/module/invoice/repository/invoice.model";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'invoice_item', timestamps: false})
export class InvoiceItemModel extends Model{
    @Column({ allowNull: false, primaryKey: true, type: DataType.UUID })
    id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @Column({ allowNull: false, type: DataType.DECIMAL })
    price: number;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false, type: DataType.UUID })
    invoiceId: string;

    @BelongsTo(() => InvoiceModel)
    invoice: InvoiceModel;

    @Column({ allowNull: false, type: DataType.DATE })
    createdAt: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updatedAt: Date;
}