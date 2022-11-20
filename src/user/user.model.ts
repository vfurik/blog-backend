import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Post } from '../post/post.model';
import { Role } from './role/role.enum';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Exclude()
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty()
  @Expose()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty()
  @Expose()
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiHideProperty()
  @Column({ type: DataType.STRING, allowNull: false })
  @Exclude()
  password: string;

  @ApiProperty()
  @Expose()
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  active: boolean;

  @ApiProperty()
  @Expose()
  @Column({ type: DataType.ENUM, values: [Role.ADMIN, Role.USER], defaultValue: Role.USER })
  role: Role;

  @ApiProperty()
  @CreatedAt
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @UpdatedAt
  @Expose()
  updatedAt: Date;

  @HasMany(() => Post)
  posts: Post[];
}
