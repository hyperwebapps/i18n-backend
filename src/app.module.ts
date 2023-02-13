import { Module } from '@nestjs/common'
import { FoldersModule } from './folders/folders.module'
import { LabelsModule } from './labels/labels.module'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [UsersModule, PrismaModule, FoldersModule, LabelsModule],
})
export class AppModule {}
