import { Module } from '@nestjs/common'
import { AppService } from '../app.service'
import { FoldersService } from '../folders/folders.service'
import { PrismaService } from '../prisma/prisma.service'
import { LabelsController } from './labels.controller'
import { LabelsService } from './labels.service'

@Module({
  providers: [LabelsService, AppService, PrismaService, FoldersService],
  controllers: [LabelsController],
})
export class LabelsModule {}
