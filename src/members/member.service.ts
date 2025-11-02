// src/members/members.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dtos/create-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member)
    private memberModel: typeof Member,
  ) {}

  // CREATE
  async create(createDto: CreateMemberDto): Promise<Member> {
    if (createDto.cpf) {
      const existing = await this.memberModel.findOne({
        where: { cpf: createDto.cpf },
      });
      if (existing) {
        throw new ConflictException('CPF already registered');
      }
    }

    return await this.memberModel.create(createDto as any);
  }

  // READ ALL
  async findAll(): Promise<Member[]> {
    return await this.memberModel.findAll({
      order: [['fullName', 'ASC']],
    });
  }

  // READ ONE
  async findOne(id: string): Promise<Member> {
    const member = await this.memberModel.findByPk(id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  // UPDATE
  async update(
    id: string,
    updateDto: Partial<CreateMemberDto>,
  ): Promise<Member> {
    const member = await this.findOne(id);

    // Verifica CPF duplicado (se estiver sendo atualizado)
    if (updateDto.cpf && updateDto.cpf !== member.cpf) {
      const existing = await this.memberModel.findOne({
        where: { cpf: updateDto.cpf },
      });
      if (existing) {
        throw new ConflictException('CPF already in use by another member');
      }
    }

    await member.update(updateDto);
    return member.reload(); // recarrega com dados atualizados
  }

  // DELETE
  async remove(id: string): Promise<void> {
    const member = await this.findOne(id);
    await member.destroy();
  }
}
