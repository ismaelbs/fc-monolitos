import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'clients', timestamps: false })
export class ClientModel extends Model {
    @Column({ allowNull: false, primaryKey: true, type: DataType.UUIDV4  })
    id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @Column({ allowNull: false, type: DataType.STRING })
    email: string;

    @Column({ allowNull: false, type: DataType.STRING })
    address: string;

    @Column({ allowNull: false, type: DataType.DATE })
    createdAt: Date;

    @Column({ allowNull: false, type: DataType.DATE })
    updatedAt: Date;
}