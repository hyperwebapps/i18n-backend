import { ValidationPipe } from '@nestjs/common'
import { VersioningType } from '@nestjs/common/enums'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { PORT } from './config'
import { HttpExceptionFilter } from './exception/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('i18n API')
    .setDescription('i18n rest api documentation')
    .setVersion('1.0')
    .addTag('i18n')
    .build()

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableVersioning({ type: VersioningType.URI })
  app.use(helmet())

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(PORT)
}
bootstrap()
