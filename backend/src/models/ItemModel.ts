import { Table, Model, Column, DataType, Unique, AllowNull, Scopes } from 'sequelize-typescript';

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
class Item extends Model<Item> {
    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.FLOAT)
    cost!: number;
}

export default Item;