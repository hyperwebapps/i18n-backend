import { Controller, Post } from '@nestjs/common'
import { Body, Delete, Get, Param, Put, Res } from '@nestjs/common/decorators'
import { Response } from 'express'
import { AppService } from 'src/app.service'
import { CreateLabelDto, UpdateLabelDto } from './dto'
import { LabelsService } from './labels.service'

@Controller({
  path: 'labels',
  version: '1',
})
export class LabelsController {
  constructor(
    private labelsService: LabelsService,
    private appService: AppService
  ) {}

  @Post()
  async create(@Res() response: Response, @Body() body: CreateLabelDto) {
    const label = await this.labelsService.create(body)
    return this.appService.okLabelCreated(response, label.uuid)
  }

  @Get()
  async findAllLabels() {
    const labels = await this.labelsService.findAllLabels()
    return labels
  }

  @Get(':id')
  async findLabel(@Param('id') id: string) {
    const label = await this.labelsService.findLabel(id)
    return label
  }

  @Put(':id')
  async update(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() body: UpdateLabelDto
  ) {
    await this.labelsService.update(id, body)
    return this.appService.okLabelUpdated(response, id)
  }

  @Delete(':id')
  async delete(@Res() response: Response, @Param('id') id: string) {
    await this.labelsService.delete(id)
    return this.appService.okLabelDeleted(response, id)
  }
}
