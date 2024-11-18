import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  ForeignKey,
  BelongsToMany,
} from "sequelize-typescript";

import { Availability, Category, Favorite, Image, User } from "../models";

interface ILocation {
  type: string;
  coordinates: [number, number];
}

export interface IProperty extends Model {
  id: string;
  slug: string;
  title: string;
  description: string;
  address: string;
  //city: string;
  location: ILocation;
  categoryId: string;
  owner: string;
  phone: string;
  userId: string;
  totalArea: number;
  coveredArea: number;
  rooms: number;
  toilets: number;
  floors: number;
  antiquity: number;
  hasAirCond: boolean;
  hasElevator: boolean;
  hasHeating: boolean;
  hasGrill: boolean;
  hasGarden: boolean;
  hasGym: boolean;
  hasLaundry: boolean;
  hasPool: boolean;
  hasPowerPlant: boolean;
  hasValetPark: boolean;
  hasWifi: boolean;
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  categoryId!: string;

  @BelongsToMany(() => User, () => Favorite)
  users!: User[];

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
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
  declare hasElevator: boolean;

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
  declare hasGym: boolean;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare hasLaundry: boolean;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare hasPool: boolean;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare hasPowerPlant: boolean;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare hasAirCond: boolean;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare hasHeating: boolean;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare hasValetPark: boolean;

  @Column({
    type: DataType.BOOLEAN(),
    defaultValue: false,
  })
  declare hasWifi: boolean;

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
