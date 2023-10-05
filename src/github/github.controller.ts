import { Controller, Get, Param } from '@nestjs/common';
import { CommitDTO } from './DTOs/github.entity';
import { ApiService } from './github.service';
import { DeepCommitDTO } from './DTOs/repo.entity';

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
  @Get(':user/:repo/:sha')
  async getCommitData(
    @Param('user') user: string,
    @Param('repo') repo: string,
    @Param('sha') sha: string,
  ): Promise<DeepCommitDTO[]> {
    try {
      const commitExtensiveResponse = await this._apiService
        .getCommitData(user, repo, sha)
        .toPromise();
      const commitExtensive = commitExtensiveResponse.data;

      // Assuming the structure is different, adjust this part based on the actual structure
      const deepCommitDTOs: DeepCommitDTO[] = commitExtensive.tree.map(
        (treeItem: any) => {
          return new DeepCommitDTO(treeItem.path, treeItem.type);
        },
      );

      return deepCommitDTOs;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
