import { Module, Global, Logger } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

const logger = new Logger('PostgresModule');

const modules = [
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: 'postgres',
      logging: true,
      username: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
      host: configService.get<string>('POSTGRES_HOST'),
      port: configService.get<number>('POSTGRES_PORT'),
      database: configService.get<string>('POSTGRES_DB'),
      models: [
        /* Add your models here */
      ],
      hooks: {
        afterConnect: () => {
          logger.log('Database connection established successfully!'); // (Conexão com o banco de dados estabelecida com sucesso!)
        },
        afterDisconnect: () => {
          logger.log('Database connection closed.'); // (Conexão com o banco de dados foi encerrada.)
        },
      },
    }),
  }),
  SequelizeModule.forFeature([
    /* Add your models here */
  ]),
];

@Global()
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class PostgresSqlDbModule {}
