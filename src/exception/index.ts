import { HttpException, HttpStatus } from '@nestjs/common'

export class InternalServerErrorException extends HttpException {
  constructor() {
    super('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN)
  }
}

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Invalid credentials', HttpStatus.FORBIDDEN)
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND)
  }
}

export class FolderNotFoundException extends HttpException {
  constructor() {
    super('Folder not found', HttpStatus.NOT_FOUND)
  }
}

export class LabelNotFoundException extends HttpException {
  constructor() {
    super('Label not found', HttpStatus.NOT_FOUND)
  }
}

export class LabelAlreadyPresentException extends HttpException {
  constructor() {
    super('Label already present', HttpStatus.BAD_REQUEST)
  }
}

export class FolderAlreadyPresentException extends HttpException {
  constructor() {
    super('Folder already present', HttpStatus.BAD_REQUEST)
  }
}
