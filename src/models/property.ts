import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";

import { Availability, Image } from "../models";

interface ILocation {
  type: string;
  coordinates: [number, number];
}

/*interface IAvailable {
  start: Date;
  end: Date;
}*/

export interface IProperty extends Model {
  id: string;
  slug: string;
  title: string;
  description: string;
  address: string;
  city: string;
  location: ILocation;
  owner: string;
  phone: string;
  //images: string[];
  totalArea: number;
  coveredArea: number;
  rooms: number;
  toilets: number;
  floors: number;
  hasGrill: boolean;
  hasGarden: boolean;
  hasPool: boolean;
  antiquity: number;
  //availability: IAvailable[];
  rentalPrice: number;
  parkingLots: number;
  areaInformation: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "properties",
  modelName: "Property",
  timestamps: true,
})
export class Property extends Model implements IProperty {
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
  declare slug: string;

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
    defaultValue: { type: "Point", coordinates: [0, 0] },
  })
  declare location: { type: string; coordinates: [number, number] };

  @Column({
    type: DataType.STRING(50),
  })
  declare owner: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare phone: string;

  @HasMany(() => Image, { as: "images" })
  declare images: Image[];

  @HasMany(() => Availability, { as: "availability" })
  declare availability: Availability[];

  @Column({
    type: DataType.DOUBLE(),
  })
  declare totalArea: number;

  @Column({
    type: DataType.DOUBLE(),
    defaultValue: 0,
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
    defaultValue: 1,
  })
  declare floors: number;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare hasGrill: boolean;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare hasGarden: boolean;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare hasPool: boolean;

  @Column({
    type: DataType.SMALLINT(),
  })
  declare antiquity: number;

  @Column({
    type: DataType.DOUBLE(),
  })
  declare rentalPrice: number;

  @Column({
    type: DataType.SMALLINT(),
    defaultValue: 0,
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
