import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Response } from 'express'
import { AppService } from 'src/app.service'
import {
  FolderAlreadyPresentException,
  FolderNotFoundException,
} from 'src/exception'
import { CreateFolderDto, FolderDto, UpdateFolderDto } from './dto'
import { FoldersService } from './folders.service'

@Controller({
  path: 'folders',
  version: '1',
})
export class FoldersController {
  constructor(
    private readonly foldersService: FoldersService,
    private appService: AppService
  ) {}

  @Post()
  async create(@Res() response: Response, @Body() body: CreateFolderDto) {
    const folderCheck = await this.foldersService.findFolderByName(body.name)
    if (folderCheck) throw new FolderAlreadyPresentException()

    const folder = await this.foldersService.create(body)
    return this.appService.okFolderCreated(response, folder.uuid)
  }

  @Get()
  async findAll() {
    const folders = await this.foldersService.findAllFolders()

    const mappedFolders = plainToInstance(FolderDto, folders)

    return mappedFolders
  }

  @Get(':id')
  async findFolder(@Param('id') id: string) {
    const folder = await this.foldersService.findFolder(id)

    if (!folder) throw new FolderNotFoundException()

    const mappedFolder = plainToInstance(FolderDto, folder)

    return mappedFolder
  }

  @Put(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() body: UpdateFolderDto
  ) {
    const folderExists = await this.foldersService.findFolder(id)
    if (!folderExists) throw new FolderNotFoundException()

    const folderNameCheck = await this.foldersService.findFolderByName(
      body.name
    )
    if (folderNameCheck) throw new FolderAlreadyPresentException()

    await this.foldersService.update(id, body)

    return this.appService.okFolderUpdated(response, id)
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    const folderCheck = await this.foldersService.findFolder(id)
    if (!folderCheck) throw new FolderNotFoundException()

    await this.foldersService.delete(id)
    return this.appService.okFolderDeleted(response, id)
  }
}
