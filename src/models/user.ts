import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

export interface IUser extends Model {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
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
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare lastName: string;

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
    type: DataType.STRING(32),
  })
  declare phone: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
