import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table({ tableName: 'posts' })
export class Post extends Model<Post> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  approved: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  authorId: number;
}
