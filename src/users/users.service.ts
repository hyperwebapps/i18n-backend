import { Injectable, UseFilters } from '@nestjs/common'
import { User } from '@prisma/client'
import * as argon2 from 'argon2'
import { HttpExceptionFilter } from 'src/exception/http-exception.filter'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDto } from './dto'

@Injectable()
@UseFilters(HttpExceptionFilter)
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(body: UserDto): Promise<User> {
    const hash = await argon2.hash(body.password)
    return await this.prisma.user.create({
      data: { ...body, password: hash },
    })
  }

  async findUser(username: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    })
  }
}
