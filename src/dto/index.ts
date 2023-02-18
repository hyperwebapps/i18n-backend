import { ApiProperty } from '@nestjs/swagger'

export class ResponseDto {
  @ApiProperty()
  id?: string
  @ApiProperty()
  code: number
  @ApiProperty()
  message: string
  @ApiProperty()
  token?: string
}
