import {
  IsString,
  IsEmail,
  IsOptional,
  Length,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// CreateUserDto (comprido, mas sem mudanças)
export class CreateUserDto {
  @IsString()
  @Length(1, 100, {
    message: 'O nome deve ter entre 1 e 100 caracteres.',
  })
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
  })
  name: string;

  @IsString()
  @Length(1, 100, {
    message: 'O endereço deve ter entre 1 e 100 caracteres.',
  })
  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço residencial do usuário',
  })
  address: string;

  @IsString()
  @Length(1, 50, {
    message: 'O cargo deve ter entre 1 e 50 caracteres.',
  })
  @ApiProperty({
    example: 'Membro',
    description: 'Cargo ou função do usuário na igreja',
  })
  role: string;

  @IsDateString()
  @ApiProperty({
    example: '1990-12-31',
    description: 'Data de nascimento no formato YYYY-MM-DD',
  })
  birthDate: string;

  @IsString()
  @Length(1, 1, {
    message: 'O gênero deve ser M ou F.',
  })
  @ApiProperty({
    example: 'M',
    description: 'Gênero do usuário (M ou F)',
  })
  gender: string;

  @IsString()
  @Length(11, 11, {
    message: 'O telefone deve ter 11 caracteres (só números).',
  })
  @ApiProperty({
    example: '32999998888',
    description: 'Número de telefone com DDD (apenas números)',
  })
  phone: string;

  @IsString()
  @IsEmail()
  @Length(1, 100, {
    message: 'O email deve ter entre 1 e 100 caracteres.',
  })
  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'Endereço de e-mail do usuário',
  })
  email: string;

  @IsString()
  @Length(11, 11, {
    message: 'O CPF deve ter 11 caracteres.',
  })
  @ApiProperty({
    example: '12345678901',
    description: 'CPF do usuário (apenas números)',
  })
  cpf: string;

  @IsString()
  @ApiProperty({
    example: 'Password123!',
    description: 'Senha do usuário (mínimo 9 caracteres, 1 letra, 1 número)',
  })
  password: string;
}

// UpdateUserDto (comprido, mas sem mudanças)
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(1, 100, {
    message: 'O nome deve ter entre 1 e 100 caracteres.',
  })
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do usuário',
    required: false,
  })
  name?: string;

  @IsString()
  @IsOptional()
  @Length(1, 100, {
    message: 'O endereço deve ter entre 1 e 100 caracteres.',
  })
  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço residencial do usuário',
    required: false,
  })
  address?: string;

  @IsString()
  @IsOptional()
  @Length(1, 50, {
    message: 'O cargo deve ter entre 1 e 50 caracteres.',
  })
  @ApiProperty({
    example: 'Membro',
    description: 'Cargo ou função do usuário na igreja',
    required: false,
  })
  role?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    example: '1990-12-31',
    description: 'Data de nascimento no formato YYYY-MM-DD',
    required: false,
  })
  birthDate?: string;

  @IsString()
  @IsOptional()
  @Length(1, 1, {
    message: 'O gênero deve ser M ou F.',
  })
  @ApiProperty({
    example: 'M',
    description: 'Gênero do usuário (M ou F)',
    required: false,
  })
  gender?: string;

  @IsString()
  @IsOptional()
  @Length(11, 11, {
    message: 'O telefone deve ter 11 caracteres.',
  })
  @ApiProperty({
    example: '32999998888',
    description: 'Número de telefone com DDD (apenas números)',
    required: false,
  })
  phone?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @Length(1, 100, {
    message: 'O email deve ter entre 1 e 100 caracteres.',
  })
  @ApiProperty({
    example: 'joao.silva@example.com',
    description: 'Endereço de e-mail do usuário',
    required: false,
  })
  email?: string;

  @IsString()
  @IsOptional()
  @Length(11, 11, {
    message: 'O CPF deve ter 11 caracteres.',
  })
  @ApiProperty({
    example: '12345678901',
    description: 'CPF do usuário (apenas números)',
    required: false,
  })
  cpf?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Password123!',
    description: 'Senha do usuário (mínimo 9 caracteres, 1 letra, 1 número)',
    required: false,
  })
  password?: string;
}

export class ResponseUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  birthDate: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  phone: string;

  // --- CORREÇÃO AQUI ---
  // Adicionando 'email' e 'cpf'
  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;
  // --- FIM DA CORREÇÃO ---
}

export class UserFiltersDto {
  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}