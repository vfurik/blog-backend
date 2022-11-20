import { Column, CreatedAt, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'jobs' })
export class Job extends Model<Job> {
  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  title: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  remote: boolean;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  location: string;

  @ApiProperty()
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  tags: string[];

  @ApiProperty()
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  jobTypes: string[];

  @ApiProperty()
  @CreatedAt
  importedAt: Date;

  @ApiProperty()
  @Column
  createdAt: number;
}
