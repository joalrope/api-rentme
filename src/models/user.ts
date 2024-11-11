import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import { Favorite } from "./favorite";
import { Property } from "./property";

export interface IUser extends Model {
  id: string;
  fullname: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
export class User extends Model implements IUser {
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare fullname: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.ENUM,
    values: ["basic", "user", "admin", "superadmin", "developer"],
    defaultValue: "user",
    allowNull: false,
  })
  declare role: string;

  @Column({
    type: DataType.STRING(255),
  })
  declare picture: string;

  @Column({
    type: DataType.STRING(32),
  })
  declare phone: string;

  @HasMany(() => Property)
  property!: Property[];

  @HasMany(() => Favorite, { as: "favorites" })
  declare favorites: Favorite[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
