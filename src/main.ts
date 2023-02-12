import { ValidationPipe } from '@nestjs/common'
import { VersioningType } from '@nestjs/common/enums'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PORT } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableVersioning({ type: VersioningType.URI })
  await app.listen(PORT)
}
bootstrap()
