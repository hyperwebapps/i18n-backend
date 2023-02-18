import { INestApplication } from '@nestjs/common/interfaces'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { FoldersController } from '../src/folders/folders.controller'
import { FoldersModule } from '../src/folders/folders.module'

describe('Folders Controller', () => {
  let app: INestApplication
  const foldersService = {
    findAllFolders: () => [
      {
        id: 'c35bf445-0b4a-4c97-a875-5656cddb4c01',
        name: 'open-lens',
      },
      {
        id: 'f6ee14ab-e1c9-45d6-853d-b19ef8f3cb75',
        name: 'helliot-mc-hgf',
      },
    ],
  }

  let folderId = ''
  const id: number = Math.floor(Math.random() * 100000000)

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [FoldersModule],
    })
      .overrideProvider(FoldersController)
      .useValue(foldersService)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('/GET folders', () => {
    return request(app.getHttpServer())
      .get('/folders')
      .expect(200)
      .expect(foldersService.findAllFolders())
  })

  it('/POST folder', async () => {
    const response = await request(app.getHttpServer())
      .post('/folders')
      .send({
        name: `folder-${id}`,
      })
    expect(response.status).toEqual(200)
    expect(response.body.code).toEqual(200)
    expect(response.body.message).toEqual(
      'Folder has been created successfully'
    )
    folderId = response.body.id
  })

  it('/PUT folder', async () => {
    return request(app.getHttpServer())
      .put(`/folders/${folderId}`)
      .send({
        name: `folder-${id}+1`,
      })
      .expect(200, {
        id: folderId,
        code: 200,
        message: 'Folder has been updated successfully',
      })
  })

  it('/GET folder', async () => {
    return request(app.getHttpServer())
      .get(`/folders/${folderId}`)
      .expect(200, {
        id: folderId,
        name: `folder-${id}+1`,
      })
  })

  it('/DELETE label', async () => {
    return request(app.getHttpServer())
      .delete(`/folders/${folderId}`)
      .expect(200, {
        id: folderId,
        code: 200,
        message: 'Folder has been deleted successfully',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
