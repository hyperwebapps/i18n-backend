import { Injectable } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
export class AppService {
  okUserCreated(response: Response, id: string): Response {
    return response
      .status(200)
      .send({ id, code: 200, message: 'User has been created successfully' })
  }

  okFolderCreated(response: Response, id: string): Response {
    return response
      .status(200)
      .send({ id, code: 200, message: 'Folder has been created successfully' })
  }

  okFolderUpdated(response: Response, id: string): Response {
    return response
      .status(200)
      .send({ id, code: 200, message: 'Folder has been updated successfully' })
  }

  okFolderDeleted(response: Response, id: string): Response {
    return response
      .status(200)
      .send({ id, code: 200, message: 'Folder has been deleted successfully' })
  }

  okLabelCreated(response: Response, id: string): Response {
    return response
      .status(200)
      .send({ id, code: 200, message: 'Label has been created successfully' })
  }

  okLabelUpdated(response: Response, id: string): Response {
    return response
      .status(200)
      .send({ id, code: 200, message: 'Label has been updated successfully' })
  }

  okLabelDeleted(response: Response, id: string): Response {
    return response
      .status(200)
      .send({ id, code: 200, message: 'Label has been deleted successfully' })
  }

  authResponse(response: Response, token: string): Response {
    return response.status(200).send({ code: 200, token })
  }
}
