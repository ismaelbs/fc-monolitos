import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'products', timestamps: false })
export class ProductModel extends Model {
    @Column({ allowNull: false, primaryKey: true, type: DataType.UUIDV4  })
    id: string;

    @Column({ allowNull: false, type: DataType.STRING })
    name: string;

    @Column({ allowNull: false, type: DataType.STRING })
    description: string;
    
    @Column({ allowNull: false, type: DataType.NUMBER })
    salesPrice: number;
}