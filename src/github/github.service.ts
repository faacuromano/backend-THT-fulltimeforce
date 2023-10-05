import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  getAllCommits(user: string, repo: string): Observable<AxiosResponse<any>> {
    const apiUrl = `https://api.github.com/repos/${user}/${repo}/commits`;
    return this.httpService.get(apiUrl);
  }

  getCommitData(
    user: string,
    repo: string,
    sha: string,
  ): Observable<AxiosResponse<any>> {
    const apiUrl = `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}`;
    return this.httpService.get(apiUrl);
  }
}
