import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

export class CreateLabelDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  en: string
  @ApiProperty()
  ru: string
  @ApiProperty()
  ch: string
  @ApiProperty()
  folder: number
}

export class UpdateLabelDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  en: string
  @ApiProperty()
  ru: string
  @ApiProperty()
  ch: string
}

@Expose()
export class LabelDto {
  @Expose({ name: 'uuid' })
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  en: string
  @ApiProperty()
  ru: string
  @ApiProperty()
  ch: string
  @Expose({ name: 'folder_id' })
  @ApiProperty()
  folder: number
  @Exclude()
  is_active: boolean
}
