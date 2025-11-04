// src/app.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MembersModule } from './members/models/members.module';
import { Sequelize } from 'sequelize';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'sib',
      autoLoadModels: true,
      synchronize: false,
    }),
    MembersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
