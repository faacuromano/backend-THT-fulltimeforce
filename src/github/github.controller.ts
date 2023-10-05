import { Controller, Get, Param } from '@nestjs/common';
import { CommitDTO } from './DTOs/github.entity';
import { ApiService } from './github.service';

@Controller('v1/commits')
export class UserController {
  constructor(private readonly _apiService: ApiService) {}

  @Get(':user/:repo')
  async getAllCommits(
    @Param('user') user: string,
    @Param('repo') repo: string,
  ): Promise<CommitDTO[]> {
    try {
      const commits = await this._apiService
        .getAllCommits(user, repo)
        .toPromise();
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
