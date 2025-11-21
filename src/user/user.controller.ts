import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  ResponseUserDto,
  UserFiltersDto,
} from 'src/dto/user.dto';
import { ApiQuery } from '@nestjs/swagger';

@ApiTags('User')
@Controller('api/v1/sibApi/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar todos os usuários' })
  @ApiOkResponse({
    description: 'Lista de usuários encontrada',
    type: [ResponseUserDto],
  })
  async findAll() {
    return this.userService.findAll();
  }

  @Get('search')
  @ApiOperation({
    summary: 'Buscar usuários por filtros (cpf, email, name ou phone)',
  })
  @ApiOkResponse({
    description: 'Lista de usuários encontrada',
    type: [ResponseUserDto],
  })
  @ApiBadRequestResponse({
    description: 'Nenhum filtro fornecido ou entrada inválida',
  })
  @ApiQuery({ name: 'cpf', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'phone', required: false })
  async findByFilters(@Query() filters: UserFiltersDto) {
    return await this.userService.findByFilters(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário por ID' })
  @ApiOkResponse({
    description: 'Usuário encontrado com sucesso',
    type: ResponseUserDto,
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findById(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
    type: ResponseUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Entrada inválida ou falha na validação',
  })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() dto: CreateUserDto): Promise<ResponseUserDto> {
    return this.userService.createUser(dto);
  }

  @Patch('edit/:id')
  @ApiOperation({ summary: 'Editar um usuário existente' })
  @ApiOkResponse({
    description: 'Usuário editado com sucesso',
    type: ResponseUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Entrada inválida ou falha na validação',
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBody({ type: UpdateUserDto })
  async editUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.userService.editUser(Number(id), dto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Deletar um usuário existente' })
  @ApiOkResponse({
    description: 'Usuário deletado com sucesso',
  })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}