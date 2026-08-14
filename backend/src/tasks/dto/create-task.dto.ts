import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum TaskStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsOptional()
  assignee?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  tag?: string;
}