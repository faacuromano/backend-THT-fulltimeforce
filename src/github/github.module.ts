import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserController } from './github.controller';
import { ApiService } from './github.service';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [ApiService],
})
export class GithubModule {}
