import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  Index,
} from "sequelize-typescript";
import { Property } from "./property";
import { User } from "./user";
2;

@Table({
  tableName: "favorites",
  modelName: "Favorite",
})
export class Favorite extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @ForeignKey(() => Property)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  propertyId!: string;

  @Index(["userId", "propertyId"])
  static async findByUserAndProperty(
    userId: number,
    propertyId: number
  ): Promise<Favorite | null> {
    return await Favorite.findOne({ where: { userId, propertyId } });
  }
}
