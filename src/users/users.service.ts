import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import * as argon2 from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async register(body: UserDto): Promise<User> {
    try {
      const hash = await argon2.hash(body.password)
      return await this.prisma.user.create({
        data: { ...body, password: hash },
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async authenticate(body: UserDto): Promise<string> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          username: body.username,
        },
      })
      if (!(await argon2.verify(user.password, body.password)))
        throw new Error('Invalid credential')
      return user.uuid
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
