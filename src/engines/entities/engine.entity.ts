import { Exclude, Expose } from 'class-transformer';
import * as moment from 'moment';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Exclude()
@Table({
  timestamps: true,
  paranoid: true,
  version: true,
  getterMethods: {
    timestamp() {
      return moment().unix();
    },
  },
})
export class Engine extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  slug: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Expose()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Expose()
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  version: number;
}
