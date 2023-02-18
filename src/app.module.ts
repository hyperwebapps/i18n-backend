import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { FoldersModule } from './folders/folders.module'
import { LabelsModule } from './labels/labels.module'
import { PrismaModule } from './prisma/prisma.module'
import { JwtAuthGuard } from './users/jwt/jwt-auth.guard'
import { UsersModule } from './users/users.module'

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [UsersModule, PrismaModule, FoldersModule, LabelsModule],
})
export class AppModule {}
