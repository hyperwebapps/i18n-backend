import { INestApplication } from '@nestjs/common/interfaces'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { LabelsController } from '../src/labels/labels.controller'
import { LabelsModule } from '../src/labels/labels.module'

describe('Labels Controller', () => {
  let app: INestApplication
  let labelsService = {
    findAllLabels: () => [
      {
        id: '5ae43b38-c774-4d9a-ac79-cbfb658478aa',
        name: 'label-folder-20',
        folder: 1,
        en: 'take this or leave',
        ru: 'take this or leave',
        ch: 'take this or leave',
      },
      {
        id: 'aa15a736-b652-44a7-a1c2-23d03583d22f',
        name: 'label-folder-2357651',
        folder: 1,
        en: 'take this or leave',
        ru: 'take this or leave',
        ch: 'take this or leave',
      },
      {
        id: 'b1bee0f5-f012-4871-83af-e8fb38ba641d',
        name: 'label-folder-20221372',
        folder: 1,
        en: 'take this or leave',
        ru: 'take this or leave',
        ch: 'take this or leave',
      },
    ],
  }
  let labelId = ''
  const id: number = Math.floor(Math.random() * 100000000)

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

  it('/PUT label', async () => {
    const response = await request(app.getHttpServer())
      .put(`/labels/${labelId}`)
      .send({
        name: `label-folder-${id}+1`,
        en: 'take this or leave',
        ru: 'take this or leave',
        ch: 'take this or leave',
      })
    expect(response.status).toBe(200)
  })

  it('/DELETE label', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/labels/${labelId}`
    )
    expect(response.status).toBe(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
