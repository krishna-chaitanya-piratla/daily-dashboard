import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { appStartMessage, defaultCorsOptionsFactory, envVars } from './app.constants';


async function bootstrap() {
  // start timer to measure time taken for application to launch completely
  console.time(`App launched in`);

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.enableCors(defaultCorsOptionsFactory(configService));

  console.log(`corsOptions = ${JSON.stringify(defaultCorsOptionsFactory(configService))}`);
  
  await app.listen(envVars(configService).server_port);
  
  // log the time taken for application to launch completely
  console.timeEnd(`App launched in`);

  // Display the port on which app is running
  appStartMessage(configService);
}

bootstrap();
