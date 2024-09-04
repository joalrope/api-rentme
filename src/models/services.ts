import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

export interface IService extends Model {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  //Geolocation: coordinates
  owner: string;
  phone: string;
  servicePrice: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "services",
  modelName: "Service",
  timestamps: true,
})
export class Service extends Model implements IService {
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
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare address: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare city: string;

  @Column({
    type: DataType.GEOMETRY("POINT"),
    allowNull: false,
    defaultValue: [0, 0],
  })
  declare Geolocation: [number, number];

  @Column({
    type: DataType.DOUBLE(3, 2),
    allowNull: false,
  })
  declare coverageRadius: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare owner: string;

  @Column({
    type: DataType.STRING(32),
  })
  declare phone: string;

  @Column({
    type: DataType.DOUBLE(11, 2),
  })
  declare servicePrice: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
