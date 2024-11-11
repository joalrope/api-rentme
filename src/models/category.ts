import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

export interface ICategory extends Model {
  id: string;
  name: string;
  slug: string;
  pictureUrl: string;
  ellipsis: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "categories",
  modelName: "Category",
  timestamps: true,
})
export class Category extends Model implements ICategory {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare slug: string;

  @Column({
    type: DataType.STRING(255),
  })
  declare pictureUrl: string;

  @Column({
    type: DataType.STRING(32),
  })
  declare ellipsis: string;

  @Column({
    type: DataType.STRING(64),
  })
  declare icon: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
