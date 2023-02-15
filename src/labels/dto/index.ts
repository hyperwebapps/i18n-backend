import { Exclude, Expose } from 'class-transformer'

export class CreateLabelDto {
  name: string
  en: string
  ru: string
  ch: string
  folder: string
}

export class UpdateLabelDto {
  name: string
  en: string
  ru: string
  ch: string
}

@Expose()
export class LabelDto {
  @Expose({ name: 'uuid' })
  id: string
  @Expose({ name: 'folder_id' })
  folder: number
  @Exclude()
  is_active: boolean
}
