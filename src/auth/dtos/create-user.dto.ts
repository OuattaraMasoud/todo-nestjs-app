import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The title of the todo' })
  @IsString()
  readonly userName: string;

  @ApiProperty({ description: 'The title of the todo' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: 'The title of the todo' })
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiProperty({ description: 'The title of the todo' })
  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @ApiProperty({ description: 'The title of the todo' })
  @IsString()
  readonly email: string;

  @ApiProperty({ description: 'The title of the todo' })
  @IsOptional()
  @IsArray()
  readonly role?: string[];
}
