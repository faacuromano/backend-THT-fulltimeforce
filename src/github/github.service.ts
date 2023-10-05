import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosResponse } from 'axios';

@Injectable()
export class ApiService {
  private readonly githubApiBaseUrl = 'https://api.github.com';

  constructor(private readonly httpService: HttpService) {}

  private buildGithubApiUrl(endpoint: string): string {
    return `${this.githubApiBaseUrl}/${endpoint}`;
  }

  getAllCommits(user: string, repo: string): Observable<AxiosResponse<any>> {
    const apiUrl = this.buildGithubApiUrl(`repos/${user}/${repo}/commits`);
    return this.httpService
      .get(apiUrl)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getCommitData(
    user: string,
    repo: string,
    sha: string,
  ): Observable<AxiosResponse<any>> {
    const apiUrl = this.buildGithubApiUrl(
      `repos/${user}/${repo}/git/trees/${sha}`,
    );
    return this.httpService
      .get(apiUrl)
      .pipe(catchError((error) => this.handleError(error)));
  }

  public handleError(error: any): Observable<never> {
    const message = error.response.data.message || 'Unhandled error.';
    throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
