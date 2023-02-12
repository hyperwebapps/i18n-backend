import { Injectable } from '@nestjs/common'
import { users } from '@prisma/client'
import * as argon2 from 'argon2'
import { randomUUID } from 'crypto'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async register(body: UserDto): Promise<users> {
    try {
      const hash = await argon2.hash(body.password)
      return await this.prisma.users.create({
        data: { ...body, password: hash, uuid: randomUUID() },
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async authenticate(body: UserDto): Promise<string> {
    try {
      const user = await this.prisma.users.findUniqueOrThrow({
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
