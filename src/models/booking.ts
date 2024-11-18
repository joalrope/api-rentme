import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

export interface IBooking extends Model {
  id: string;
  userId: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  payDate: Date;
  price: number;
  payMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "bookings",
  modelName: "Booking",
  timestamps: true,
})
export class Booking extends Model implements IBooking {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @Column({
    type: DataType.UUID,
  })
  declare propertyId: string;

  @Column({
    type: DataType.DATE(),
  })
  declare startDate: Date;

  @Column({
    type: DataType.DATE(),
  })
  declare endDate: Date;

  @Column({
    type: DataType.DATE(),
  })
  declare payDate: Date;

  @Column({
    type: DataType.DOUBLE(),
  })
  declare price: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare payMethod: string;

  @Column({
    type: DataType.ENUM,
    values: ["pending", "confirm", "hold", "cancelled"],
    defaultValue: "pending",
    allowNull: false,
  })
  declare status: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
