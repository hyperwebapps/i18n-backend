import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AppService } from 'src/app.service'
import { JWT_SECRET } from 'src/config'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtStrategy } from './jwt/jwt.strategy'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AppService, PrismaService, JwtStrategy],
})
export class UsersModule {}
