import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresSqlDbModule } from './postgres-sql/postgres-sql-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresSqlDbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
