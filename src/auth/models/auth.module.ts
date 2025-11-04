import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from '../auth.service';
import { AuthController } from '../auth.controller';
import { Member } from '../../members/entities/member.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Member]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'chave-super-secreta', // use variável de ambiente em produção
      signOptions: { expiresIn: '1d' }, // token válido por 1 dia
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}