import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Property } from "./property";
2;
export interface IAvailability extends Model {
  id: string;
  propertyId: string;
  start: Date;
  end: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "availabilities",
  modelName: "Availability",
  timestamps: true,
})
export class Availability extends Model implements IAvailability {
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => Property)
  @Column({
    type: DataType.UUIDV4,
  })
  declare propertyId: string;

  @BelongsTo(() => Property)
  property!: Property;

  @Column({
    type: DataType.DATE(),
    allowNull: false,
  })
  declare start: Date;

  @Column({
    type: DataType.DATE(),
    allowNull: false,
  })
  declare end: Date;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
