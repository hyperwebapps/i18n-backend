import { Module } from '@nestjs/common'
import { AppService } from 'src/app.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, AppService, PrismaService],
})
export class UsersModule {}
