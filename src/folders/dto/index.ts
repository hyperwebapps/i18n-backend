import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

export class CreateFolderDto {
  @ApiProperty()
  name: string
}

export class UpdateFolderDto {
  @ApiProperty()
  name: string
}

@Expose()
export class FolderDto {
  @Expose({ name: 'uuid' })
  id: string
  @ApiProperty()
  name: string
  @Exclude()
  is_active: boolean
}
