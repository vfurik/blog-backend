import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Post } from '../post/post.model';
import { Role } from './role/role.enum';
import { Exclude, Expose } from 'class-transformer';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Exclude()
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Expose()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Expose()
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @Exclude()
  password: string;

  @Expose()
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  active: boolean;

  @Expose()
  @Column({ type: DataType.ENUM, values: [Role.ADMIN, Role.USER], defaultValue: Role.USER })
  role: Role;

  @CreatedAt
  @Expose()
  createdAt: Date;

  @UpdatedAt
  @Expose()
  updatedAt: Date;

  @HasMany(() => Post)
  posts: Post[];
}
