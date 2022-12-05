import { Model, Table, Column, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.model';

interface PostCreationAttrs {
  name: string;
  title: string;
  authorId: number;
  approved: boolean;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
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
    defaultValue: false,
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
