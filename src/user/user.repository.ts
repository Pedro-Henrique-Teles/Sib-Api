import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { Op } from 'sequelize';
import { User } from 'src/model/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(dto);
    return user;
  }

  async editUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await user.update(dto);
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }
  async findByFilters(
    filters: Partial<User> & { name?: string; phone?: string },
  ): Promise<User[]> {
    const conditions: Array<Record<string, unknown>> = [];

    const name = (filters as unknown as { name?: string }).name;
    const phone = (filters as unknown as { phone?: string }).phone;

    if (name) conditions.push({ name: { [Op.iLike]: `%${name}%` } });
    if (phone) conditions.push({ phone: { [Op.iLike]: `%${phone}%` } });

    if (conditions.length === 0) {
      throw new BadRequestException(
        'É necessário informar pelo menos um filtro.',
      );
    }

    return this.userModel.findAll({ where: { [Op.and]: conditions } });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await user.destroy();
  }
}
