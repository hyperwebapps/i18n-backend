import { Controller, Post } from '@nestjs/common'
import { Body, Delete, Get, Param, Put, Res } from '@nestjs/common/decorators'
import { ApiBearerAuth } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { Response } from 'express'
import { AppService } from '../app.service'
import {
  FolderNotFoundException,
  LabelAlreadyPresentException,
  LabelNotFoundException,
} from '../exception'
import { FoldersService } from '../folders/folders.service'
import { CreateLabelDto, LabelDto, UpdateLabelDto } from './dto'
import { LabelsService } from './labels.service'

@ApiBearerAuth()
@Controller({
  path: 'labels',
  version: '1',
})
export class LabelsController {
  constructor(
    private labelsService: LabelsService,
    private appService: AppService,
    private folderService: FoldersService
  ) {}

  @Post()
  async create(@Res() response: Response, @Body() body: CreateLabelDto) {
    const folder = await this.folderService.findFolder(body.folder)
    if (!folder) throw new FolderNotFoundException()

    const labelCheck = await this.labelsService.findLabelByName(body.name)
    if (labelCheck) throw new LabelAlreadyPresentException()

    const label = await this.labelsService.create(body, folder.id)
    return this.appService.okLabelCreated(response, label.uuid)
  }

  @Get()
  async findAllLabels() {
    const labels = await this.labelsService.findAllLabels()

    const convertedLabels = plainToInstance(LabelDto, labels)

    return convertedLabels
  }

  @Get(':id')
  async findLabel(@Param('id') id: string) {
    const label = await this.labelsService.findLabel(id)
    if (!label) throw new LabelNotFoundException()

    const convertedLabel = plainToInstance(LabelDto, label)

    return convertedLabel
  }

  @Put(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() body: UpdateLabelDto
  ) {
    const labelExists = await this.labelsService.findLabel(id)
    if (!labelExists) throw new LabelNotFoundException()

    const labelNameCheck = await this.labelsService.findLabelByName(body.name)
    if (labelNameCheck) throw new LabelAlreadyPresentException()

    await this.labelsService.update(id, body)

    return this.appService.okLabelUpdated(response, id)
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    const labelCheck = await this.labelsService.findLabel(id)
    if (!labelCheck) throw new LabelNotFoundException()

    await this.labelsService.delete(id)

    return this.appService.okLabelDeleted(response, id)
  }
}
