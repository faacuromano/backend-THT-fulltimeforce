import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ApiService {
  private readonly githubToken: string =
    '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'; // Reemplaza con tu token

  constructor(private httpService: HttpService) {}

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.githubToken}`,
    };
  }

  getAllCommits(user: string, repo: string): Observable<AxiosResponse<any>> {
    const apiUrl = `https://api.github.com/repos/${user}/${repo}/commits`;
    return this.httpService.get(apiUrl, { headers: this.getHeaders() });
  }

  getCommitData(
    user: string,
    repo: string,
    sha: string,
  ): Observable<AxiosResponse<any>> {
    const apiUrl = `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}`;
    return this.httpService.get(apiUrl, { headers: this.getHeaders() });
  }
}
