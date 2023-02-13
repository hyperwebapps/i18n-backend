import { Injectable } from '@nestjs/common'
import { Folder } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateFolderDto, UpdateFolderDto } from './dto'

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateFolderDto): Promise<Folder> {
    try {
      const folder = await this.prisma.folder.create({
        data: body,
      })

      return folder
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async findAllFolders(): Promise<Folder[]> {
    try {
      const folders = await this.prisma.folder.findMany({
        where: {
          is_active: true,
        },
      })
      return folders
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async findFolder(id: string): Promise<Folder> {
    try {
      const folder = await this.prisma.folder.findUnique({
        where: {
          uuid: id,
        },
      })

      return folder
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async update(id: string, body: UpdateFolderDto): Promise<void> {
    try {
      await this.prisma.folder.update({
        where: {
          uuid: id,
        },
        data: body,
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.folder.update({
        where: {
          uuid: id,
        },
        data: {
          is_active: false,
        },
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
