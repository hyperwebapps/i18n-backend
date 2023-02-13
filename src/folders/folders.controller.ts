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
import { Response } from 'express'
import { AppService } from 'src/app.service'
import { CreateFolderDto, UpdateFolderDto } from './dto'
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
    const folder = await this.foldersService.create(body)
    return this.appService.okFolderCreated(response, folder.uuid)
  }

  @Get()
  async findAll() {
    return this.foldersService.findAllFolders()
  }

  @Get(':id')
  async findFolder(@Param('id') id: string) {
    return this.foldersService.findFolder(id)
  }

  @Put(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() body: UpdateFolderDto
  ) {
    await this.foldersService.update(id, body)
    return this.appService.okFolderUpdated(response, id)
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    await this.foldersService.delete(id)
    return this.appService.okFolderDeleted(response, id)
  }
}
