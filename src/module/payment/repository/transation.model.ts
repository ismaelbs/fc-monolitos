import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'transactions', timestamps: false})
export class TransactionModel extends Model{
    @Column({ allowNull: false, primaryKey: true, type: DataType.UUID })
    id: string;

    @Column({ allowNull: false, type: DataType.NUMBER })
    amount: number;

    @Column({ allowNull: false, type: DataType.STRING })
    orderId: string;

    @Column({ allowNull: false, type: DataType.STRING })
    status: string;

    @Column({ allowNull: false, type: DataType.DATE })
    createdAt: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updatedAt: Date;
}