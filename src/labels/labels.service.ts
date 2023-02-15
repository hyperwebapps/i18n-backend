import { Injectable } from '@nestjs/common'
import { Label } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateLabelDto, UpdateLabelDto } from './dto'

@Injectable()
export class LabelsService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateLabelDto, folderId: string): Promise<Label> {
    delete body.folder
    const label = await this.prisma.label.create({
      data: {
        ...body,
        folders: {
          connect: {
            uuid: folderId,
          },
        },
      },
    })
    return label
  }

  async findAllLabels(): Promise<Label[]> {
    const labels = await this.prisma.label.findMany({
      where: {
        is_active: true,
      },
    })
    return labels
  }

  async findLabel(id: string): Promise<Label> {
    const label = await this.prisma.label.findUnique({
      where: {
        isActiveByUuid: {
          uuid: id,
          is_active: true,
        },
      },
    })
    return label
  }

  async findLabelByName(name: string): Promise<Label> {
    const label = await this.prisma.label.findUnique({
      where: {
        name: name,
      },
    })
    return label
  }

  async findActiveLabelByName(name: string): Promise<Label> {
    const label = await this.prisma.label.findUnique({
      where: {
        isActiveByName: {
          name: name,
          is_active: true,
        },
      },
    })
    return label
  }

  async update(id: string, body: UpdateLabelDto): Promise<void> {
    const label = await this.prisma.label.update({
      where: {
        isActiveByUuid: {
          uuid: id,
          is_active: true,
        },
      },
      data: body,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.label.update({
      where: {
        isActiveByUuid: {
          uuid: id,
          is_active: true,
        },
      },
      data: {
        is_active: false,
      },
    })
  }
}
