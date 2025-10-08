import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const appName =
    configService.get<string>('MICROSERVICE_NAME') || 'INSERT_SERVICE_NAME';
  const logger = new Logger(appName);

  const port = Number(
    configService.get<string>('PORT', process.env.PORT || '3008'),
  );
  const cors = configService.get<string>('CORS', '*');
  const trustProxy =
    configService.get<string>('TRUST_PROXY', 'false') === 'true';

  if (trustProxy) {
    app.set('trust proxy', 1);
    logger.log('Trust proxy habilitado');
  }

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || cors === '*' || cors.split(',').includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS from origin ${origin}`));
      }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Microservice Negotiation Panels')
    .setDescription('Microserviço responsável pelo painel de negociação')
    .setVersion('1.0')
    .setContact('CallFly', 'https://hml.callfly.com.br', ' Homologação');

  // Always add localhost for development
  config.addServer(`http://localhost:${port}`, 'Development');

  config.addBearerAuth();

  const swaggerConfig = config.build();

  // Only setup Swagger if not in production
  const nodeEnv = configService.get<string>('NODE_ENV');

  if (nodeEnv !== 'production') {
    const documentFactory = () =>
      SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, documentFactory);
  }

  await app.listen(port);
  logger.log(`Microservice ${appName} listening on port ${port}`);
}

void bootstrap();
