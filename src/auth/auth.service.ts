import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Member } from '../members/entities/member.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Member)
    private memberRepository: typeof Member,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const member = await this.memberRepository.findOne({ where: { email } });

    if (!member) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(password, member.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const { password: _, ...result } = member.toJSON();
    return result;
  }

  async login(email: string, password: string) {
    const member = await this.validateUser(email, password);

    const payload = { sub: member.id, email: member.email, role: member.role };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Login realizado com sucesso',
      token,
      member,
    };
  }

  async register(data: { email: string; password: string; fullName: string; role?: string }) {
    const { email, password, fullName, role } = data;

    const existingMember = await this.memberRepository.findOne({ where: { email } });
    if (existingMember) {
      throw new BadRequestException('Email já está em uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = await this.memberRepository.create({
      email,
      password: hashedPassword,
      fullName,
      role: role || 'member',
    });

    const { password: _, ...result } = newMember.toJSON();

    const payload = { sub: result.id, email: result.email, role: result.role };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Usuário registrado com sucesso',
      token,
      member: result,
    };
  }
}