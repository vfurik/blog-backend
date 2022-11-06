import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from '../post/post.model';
import { Role } from './role/role.enum';
import { Exclude } from 'class-transformer';

interface UserCreationAttrs {
  email: string;
  password: string;
}
@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @Exclude()
  password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  active: boolean;

  @Column({ type: DataType.ENUM, values: [Role.ADMIN, Role.USER], defaultValue: Role.USER })
  role: Role;

  @HasMany(() => Post)
  posts: Post[];
}
