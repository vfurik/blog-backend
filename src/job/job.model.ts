import { Column, CreatedAt, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'jobs' })
export class Job extends Model<Job> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  remote: boolean;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  tags: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  jobTypes: string[];

  @CreatedAt
  importedAt: Date;

  @Column
  createdAt: number;
}
