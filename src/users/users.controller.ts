import { Controller, Post } from '@nestjs/common'
import {
  Body,
  Res,
} from '@nestjs/common/decorators/http/route-params.decorator'
import { Response } from 'express'
import { AppService } from 'src/app.service'
import { UserDto } from './dto'
import { UsersService } from './users.service'

@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private appService: AppService,
    private userService: UsersService
  ) {}

  @Post('register')
  async registerUser(@Res() response: Response, @Body() body: UserDto) {
    const user = await this.userService.register(body)
    return this.appService.okUserCreated(response, user.uuid)
  }

  @Post('auth')
  async authenticateUser(@Res() response: Response, @Body() body: UserDto) {
    const token = await this.userService.authenticate(body)
    return this.appService.authResponse(response, token)
  }
}
