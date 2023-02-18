import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty()
  username: string
  @ApiProperty()
  password: string
}

export class AuthDto {
  @ApiProperty()
  code: number
  @ApiProperty()
  token: string
}
