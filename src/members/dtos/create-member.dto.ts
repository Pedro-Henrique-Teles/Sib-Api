import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsDateString,
  IsEnum,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 120)
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsEnum(['M', 'F', 'Other'])
  gender: 'M' | 'F' | 'Other';

  @IsOptional()
  @IsString()
  @Length(10, 20)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  address?: string;

  @IsOptional()
  @Length(11, 11)
  cpf?: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsOptional()
  @IsString()
  @Length(1, 80)
  origin?: string;

  @IsOptional()
  @IsString()
  @Length(1, 80)
  occupation?: string;

  @IsOptional()
  @IsString()
  @Length(1, 80)
  education?: string;

  @IsOptional()
  @IsString()
  @Length(1, 80)
  role?: string;
}