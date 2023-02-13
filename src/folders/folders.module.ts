import { Module } from '@nestjs/common'
import { AppService } from 'src/app.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { FoldersController } from './folders.controller'
import { FoldersService } from './folders.service'

@Module({
  controllers: [FoldersController],
  providers: [FoldersService, PrismaService, AppService],
})
export class FoldersModule {}
