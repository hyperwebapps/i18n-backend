import { ValidationPipe } from '@nestjs/common'
import { VersioningType } from '@nestjs/common/enums'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { PORT } from './config'
import { HttpExceptionFilter } from './exception/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableVersioning({ type: VersioningType.URI })
  app.use(helmet())
  await app.listen(PORT)
}
bootstrap()
