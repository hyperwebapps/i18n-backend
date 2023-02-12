import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'

@Module({
  imports: [UsersModule],
  providers: [],
})
export class AppModule {}
