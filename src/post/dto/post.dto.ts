import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly title: string;
  readonly authorId: number;
}
