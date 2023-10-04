// En el lugar donde necesitas utilizarlo (por ejemplo, un controlador)

import { Controller, Get, Param } from '@nestjs/common';
import { CommitDTO } from './github.entity';
import { ApiService } from './github.service';

@Controller('v1/commits')
export class UserController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  async getAllCommits(): Promise<CommitDTO[]> {
    try {
      const commits = await this.apiService.getAllCommits().toPromise();
      return commits.data.map((commit) => {
        return new CommitDTO(
          commit.sha,
          commit.commit.message,
          commit.author.login,
          commit.commit.author.email,
          commit.commit.author.date,
          commit.commit.tree.url,
        );
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
