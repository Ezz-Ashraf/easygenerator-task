
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule ,  {
    bufferLogs: true, 
  });

  const config = new DocumentBuilder()
    .setTitle('Ecommerce example')
    .setDescription('The ecommerce app API description')
    .setVersion('1.0')
    .addTag('products') .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'jwt',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: '*', // replace with your frontend's origin
    credentials: true, // if you're using cookies or Authorization headers
  });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new ResponseInterceptor());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
