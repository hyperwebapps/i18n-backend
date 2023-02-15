import { Exclude, Expose } from 'class-transformer'

export class CreateFolderDto {
  name: string
}

export class UpdateFolderDto {
  name: string
}

@Expose()
export class FolderDto {
  @Expose({ name: 'uuid' })
  id: string

  @Exclude()
  is_active: boolean
}
