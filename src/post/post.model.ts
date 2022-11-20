import { Model, Table, Column, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'posts' })
export class Post extends Model<Post> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  approved: boolean;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  authorId: number;

  @ApiProperty()
  @CreatedAt
  createdAt: Date;

  @ApiProperty()
  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;
}
