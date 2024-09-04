import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

export interface IImmovable extends Model {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  //Geolocation: coordinates
  owner: string;
  phone: string;
  totalArea: number;
  coveredArea: number;
  rooms: number;
  toilets: number;
  floors: number;
  hasGrill: boolean;
  hasGarden: boolean;
  hasPool: boolean;
  antiquity: number;
  rentalPrice: number;
  parkingLots: number;
  areaInformation: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "immovables",
  modelName: "Immovable",
  timestamps: true,
})
export class Immovable extends Model implements IImmovable {
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
    type: DataType.STRING(50),
  })
  declare owner: string;

  @Column({
    type: DataType.STRING(32),
  })
  declare phone: string;

  @Column({
    type: DataType.DOUBLE(6, 2),
  })
  declare totalArea: number;

  @Column({
    type: DataType.DOUBLE(6, 2),
  })
  declare coveredArea: number;

  @Column({
    type: DataType.SMALLINT(),
  })
  declare rooms: number;

  @Column({
    type: DataType.SMALLINT(),
  })
  declare toilets: number;

  @Column({
    type: DataType.SMALLINT(),
  })
  declare floors: number;

  @Column({
    type: DataType.BOOLEAN(),
  })
  declare hasGrill: boolean;

  @Column({
    type: DataType.BOOLEAN(),
  })
  declare hasGarden: boolean;

  @Column({
    type: DataType.BOOLEAN(),
  })
  declare hasPool: boolean;

  @Column({
    type: DataType.SMALLINT(),
  })
  declare antiquity: number;

  @Column({
    type: DataType.DOUBLE(11, 2),
  })
  declare rentalPrice: number;

  @Column({
    type: DataType.SMALLINT(),
  })
  declare parkingLots: number;

  @Column({
    type: DataType.TEXT(),
  })
  declare areaInformation: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
