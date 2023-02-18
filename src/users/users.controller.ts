import { Controller, Post } from '@nestjs/common'
import {
  Body,
  Res,
} from '@nestjs/common/decorators/http/route-params.decorator'
import { JwtService } from '@nestjs/jwt'
import { ApiResponse } from '@nestjs/swagger'
import * as argon2 from 'argon2'
import { Response } from 'express'
import { AppService } from 'src/app.service'
import {
  InvalidCredentialsException,
  UserNotFoundException,
} from 'src/exception'
import { UserDto } from './dto'
import { Public } from './jwt/public.decorator'
import { UsersService } from './users.service'

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private appService: AppService,
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  @Post('register')
  @Public()
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully created.',
  })
  async registerUser(@Res() response: Response, @Body() body: UserDto) {
    const user = await this.userService.createUser(body)
    return this.appService.okUserCreated(response, user.uuid)
  }

  @Post('login')
  @Public()
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully authenticated.',
  })
  async authenticateUser(@Res() response: Response, @Body() body: UserDto) {
    const user = await this.userService.findUser(body.username)
    if (!user) throw new UserNotFoundException()

    if (!(await argon2.verify(user.password, body.password)))
      throw new InvalidCredentialsException()

    const payload = { username: user.username, sub: user.uuid }
    const token = await this.jwtService.signAsync(payload)
    return this.appService.authResponse(response, token)
  }
}
