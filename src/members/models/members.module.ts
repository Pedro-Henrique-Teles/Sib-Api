// src/members/members.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MemberService } from '../member.service';
import { MemberController } from '../member.controller';
import { Member } from '../entities/member.entity';

@Module({
  imports: [SequelizeModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MembersModule {}
