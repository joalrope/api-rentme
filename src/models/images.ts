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
export interface IImage extends Model {
  id: string;
  propertyId: string;
  pos: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "images",
  modelName: "Image",
  timestamps: true,
})
export class Image extends Model implements IImage {
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
    type: DataType.SMALLINT(),
    allowNull: false,
  })
  declare pos: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare url: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
