import { Injectable } from '@nestjs/common'
import { Label } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateLabelDto, UpdateLabelDto } from './dto'

@Injectable()
export class LabelsService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateLabelDto): Promise<Label> {
    try {
      const folder = await this.prisma.folder.findUnique({
        where: {
          uuid: body.folder,
        },
      })

      delete body.folder

      const label = await this.prisma.label.create({
        data: {
          ...body,
          folders: {
            connect: {
              uuid: folder.uuid,
            },
          },
        },
      })

      return label
    } catch (error) {}
  }

  async findAllLabels(): Promise<Label[]> {
    try {
      const labels = await this.prisma.label.findMany({
        where: {
          is_active: true,
        },
      })
      return labels
    } catch (error) {}
  }

  async findLabel(id: string): Promise<Label> {
    try {
      const label = await this.prisma.label.findUnique({
        where: {
          uuid: id,
        },
      })
      return label
    } catch (error) {}
  }

  async update(id: string, body: UpdateLabelDto): Promise<void> {
    try {
      await this.prisma.label.update({
        where: {
          uuid: id,
        },
        data: body,
      })
    } catch (error) {}
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.label.update({
        where: {
          uuid: id,
        },
        data: {
          is_active: false,
        },
      })
    } catch (error) {}
  }
}
