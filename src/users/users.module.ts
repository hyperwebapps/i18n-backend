import { Module } from '@nestjs/common'
import { AppService } from 'src/app.service'
import { PrismaService } from 'src/prisma.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UsersController],
  providers: [UsersService, AppService, PrismaService],
})
export class UsersModule {}
