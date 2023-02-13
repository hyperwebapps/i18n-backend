import { Module } from '@nestjs/common'
import { AppService } from 'src/app.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { LabelsController } from './labels.controller'
import { LabelsService } from './labels.service'

@Module({
  providers: [LabelsService, AppService, PrismaService],
  controllers: [LabelsController],
})
export class LabelsModule {}
