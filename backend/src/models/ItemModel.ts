import { Table, Model, Column, DataType, Unique, AllowNull, Scopes } from 'sequelize-typescript';

export const categoryList = ['FOOD', 'CLEANING', 'HARDWARE'] as const;
export type category = typeof categoryList[number];

@Scopes(() => ({
    items: {
      include: [
        {
          model: Item,
          through: {attributes: []},
        },
      ],
    },
  }))
@Table
class Item extends Model {
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    cost!: number;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    weight!: number;

    @AllowNull(false)
    @Column(DataType.ENUM(...categoryList))
    category!: category
}

export default Item;