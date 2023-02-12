import { Injectable } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
export class AppService {
  okResponse(response: Response, id: string): Response {
    return response
      .status(200)
      .send({ id, code: 200, message: 'User has been created successfully' })
  }

  authResponse(response: Response, token: string): Response {
    return response.status(200).send({ code: 200, token })
  }
}
