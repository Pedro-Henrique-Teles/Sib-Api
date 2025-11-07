import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @Length(3, 100, {
    message: 'O nome deve ter entre 2 e 100 caracteres.',
  })
  name: string;

  @ApiProperty({
    example: '1990-05-15',
    description: 'Data de nascimento do usuário (formato: AAAA-MM-DD)',
  })
  @IsString({ message: 'A data de nascimento deve ser uma string.' })
  @IsNotEmpty({ message: 'A data de nascimento não pode estar vazia.' })
  @IsDateString({ strict: true })
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    example: 'Masculino',
    description: 'Gênero do usuário',
  })
  @IsString({ message: 'O gênero deve ser F ou M' })
  @IsNotEmpty({ message: 'O gênero não pode estar vazio.' })
  @Length(1, 1, { message: 'O gênero deve ter apenas 1 caractere.' })
  gender: string;

  @ApiProperty({
    example: '1234-5678',
    description: 'Telefone do usuário',
  })
  @IsString({ message: 'O telefone deve ser uma string.' })
  @IsNotEmpty({ message: 'O telefone não pode estar vazio.' })
  @Length(8, 15, {
    message: 'O telefone deve ter entre 8 e 15 caracteres.',
  })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço do usuário',
  })
  @IsString({ message: 'O endereço deve ser uma string.' })
  @IsNotEmpty({ message: 'O endereço não pode estar vazio.' })
  address: string;

  @ApiProperty({
    example: 'admin',
    description: 'Papel do usuário',
  })
  @IsString({ message: 'O papel deve ser uma string.' })
  @IsNotEmpty({ message: 'O papel não pode estar vazio.' })
  @IsOptional()
  role?: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do usuário',
  })
  @IsString({ message: 'O CPF deve ser uma string.' })
  @IsNotEmpty({ message: 'O CPF não pode estar vazio.' })
  @Length(11, 14, {
    message: 'O CPF deve ter entre 11 e 14 caracteres.',
  })
  cpf: string;

  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'Email do usuário',
  })
  @IsString({ message: 'O email deve ser uma string.' })
  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'Senha do usuário',
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @Length(9, 50, {
    message: 'A senha deve ter entre 9 e 50 caracteres.',
  })
  password: string;
}

export class PostLoginUserDTO {
  @ApiProperty({
    type: String,
    description: 'Digite Seu CPF',
  })
  @IsNotEmpty({ message: 'O CPF não pode estar vazio.' })
  @Length(11, 11, { message: 'O CPF deve conter exatamente 11 caracteres.' })
  @Matches(/^\d{11}$/, { message: 'O CPF deve conter apenas números.' })
  cpf: string;

  @ApiProperty({
    type: String,
    description: 'Digite sua senha',
  })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @MinLength(9, { message: 'Sua senha deve ter no mínimo 9 caracteres' })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserFiltersDto {
  @ApiPropertyOptional({
    example: '123456',
    description: 'Parte do CPF (busca parcial, só números)',
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiPropertyOptional({
    example: 'joao',
    description: 'Parte do email (busca parcial, case-insensitive)',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    example: 'Jo',
    description: 'Busca parcial por nome (case-insensitive)',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '1234',
    description: 'Busca parcial por telefone (case-insensitive)',
  })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class ResponseUserDto {
  @ApiProperty({
    example: 1,
    description: 'ID do usuário',
  })
  id: number;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  name: string;

  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço do usuário',
  })
  address: string;

  @ApiProperty({
    example: 'admin',
    description: 'Papel do usuário',
  })
  role: string;

  @ApiProperty({
    example: '1990-05-15',
    description: 'Data de nascimento do usuário (formato: AAAA-MM-DD)',
  })
  birthDate: Date;

  @ApiProperty({
    example: 'Masculino',
    description: 'Gênero do usuário',
  })
  gender: string;

  @ApiProperty({
    example: '1234-5678',
    description: 'Telefone do usuário',
  })
  phone: string;
}
