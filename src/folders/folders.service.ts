import { Injectable } from '@nestjs/common'
import { Folder } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateFolderDto, UpdateFolderDto } from './dto'

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateFolderDto): Promise<Folder> {
    const folder = await this.prisma.folder.create({
      data: body,
    })

    return folder
  }

  async findAllFolders(): Promise<Folder[]> {
    const folders = await this.prisma.folder.findMany({
      where: {
        is_active: true,
      },
    })
    return folders
  }

  async findFolder(id: string): Promise<Folder> {
    const folder = await this.prisma.folder.findUnique({
      where: {
        isActiveByUuid: {
          uuid: id,
          is_active: true,
        },
      },
    })

    return folder
  }

  async findFolderByName(name: string): Promise<Folder> {
    const folder = await this.prisma.folder.findUnique({
      where: {
        name: name,
      },
    })

    return folder
  }

  async findActiveFolderByName(name: string): Promise<Folder> {
    const folder = await this.prisma.folder.findUnique({
      where: {
        isActiveByName: {
          name: name,
          is_active: true,
        },
      },
    })

    return folder
  }

  async update(id: string, body: UpdateFolderDto): Promise<void> {
    await this.prisma.folder.update({
      where: {
        uuid: id,
      },
      data: body,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.folder.update({
      where: {
        uuid: id,
      },
      data: {
        is_active: false,
      },
    })
  }
}
