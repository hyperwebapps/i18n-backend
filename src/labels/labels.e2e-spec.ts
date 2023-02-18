import { INestApplication } from '@nestjs/common/interfaces'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { LabelsController } from './labels.controller'
import { LabelsModule } from './labels.module'

describe('Labels Controller', () => {
  let app: INestApplication
  let labelsService = {
    findAllLabels: () => [
      {
        id: '47ad2e9f-c5b4-4425-a293-57be194917e0',
        name: 'label-folder-4',
        folder: 1,
        en: 'take this or leave',
        ru: 'take this or leave',
        ch: 'take this or leave',
      },
      {
        id: 'bbfadaa5-aee0-4ff8-8fb3-f357e4591dbf',
        name: 'label-folder-6',
        folder: 1,
        en: 'take this or leave',
        ru: 'take this or leave',
        ch: 'take this or leave',
      },
      {
        id: '5ae43b38-c774-4d9a-ac79-cbfb658478aa',
        name: 'label-folder-20',
        folder: 1,
        en: 'take this or leave',
        ru: 'take this or leave',
        ch: 'take this or leave',
      },
    ],
  }
  let labelId = ''
  const id = Math.floor(Math.random() * 100000000)

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [LabelsModule],
    })
      .overrideProvider(LabelsController)
      .useValue(labelsService)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('/GET labels', () => {
    return request(app.getHttpServer())
      .get('/labels')
      .expect(200)
      .expect(labelsService.findAllLabels())
  })

  it('/POST label', async () => {
    const response = await request(app.getHttpServer())
      .post('/labels')
      .send({
        name: `label-folder-${id}`,
        en: 'take this or leave',
        ru: 'take this or leave',
        ch: 'take this or leave',
        folder: 1,
      })
    expect(response.status).toEqual(200)
    expect(response.body.code).toEqual(200)
    labelId = response.body.id
  })

  it('/GET label', async () => {
    return request(app.getHttpServer())
      .get(`/labels/${labelId}`)
      .expect(200, {
        id: labelId,
        name: `label-folder-${id}`,
        en: 'take this or leave',
        ru: 'take this or leave',
        ch: 'take this or leave',
        folder: 1,
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
