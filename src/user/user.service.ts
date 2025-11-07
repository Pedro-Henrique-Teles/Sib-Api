import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/model/user.model';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateUserDto,
  ResponseUserDto,
  UpdateUserDto,
  UserFiltersDto,
} from 'src/dto/user.dto';
import { UserHelper } from 'src/helper/user.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<ResponseUserDto> {
    const { cpf, email, password } = dto;

    const existingUser = await this.userModel.findOne({
      where: { [Op.or]: [{ cpf }, { email }] },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Já existe um usuário com este CPF ou email.',
      );
    }

    UserHelper.validatePassword(password);
    dto.password = await UserHelper.hashPassword(password);

    const user = await this.userRepository.createUser(dto);

    return this.toResponseUserDto(user);
  }

  private toResponseUserDto(user: User): ResponseUserDto {
    const { id, name, address, role, birthDate, gender, phone } = user;
    return { id, name, address, role, birthDate, gender, phone };
  }

  async editUser(id: number, dto: UpdateUserDto): Promise<ResponseUserDto> {
    const { cpf, email } = dto;
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const uniquenessConditions: Array<Record<string, string>> = [];
    if (cpf) uniquenessConditions.push({ cpf });
    if (email) uniquenessConditions.push({ email });

    if (uniquenessConditions.length > 0) {
      const existingUser = await this.userModel.findOne({
        where: {
          [Op.and]: [
            { [Op.or]: uniquenessConditions },
            { id: { [Op.ne]: id } },
          ],
        },
      });

      if (existingUser) {
        throw new BadRequestException(
          'Já existe um usuário com este CPF ou email.',
        );
      }
    }
    if (dto.password) {
      UserHelper.validatePassword(dto.password);
      dto.password = await UserHelper.hashPassword(dto.password);
    }
    await user.update(dto);
    return this.toResponseUserDto(user);
  }

  async findById(id: number): Promise<Partial<User>> {
    if (!id) {
      throw new BadRequestException('ID do usuário é obrigatório.');
    }
    const user = await this.userRepository.findById(Number(id));
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async findByFilters(filters: UserFiltersDto): Promise<Partial<User>[]> {
    const users = await this.userRepository.findByFilters(
      filters as Partial<User> & { name?: string; phone?: string },
    );

    return users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    });
  }

  async findAll(): Promise<Partial<User>[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    });
  }
}
