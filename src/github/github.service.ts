import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  getAllCommits(): Observable<AxiosResponse<any>> {
    const apiUrl = `https://api.github.com/repos/faacuromano/Saturno-BackEnd/commits`;
    return this.httpService.get(apiUrl);
  }

  getCommitData(sha: string): Observable<AxiosResponse<any>> {
    const apiUrl = `https://api.github.com/repos/faacuromano/Saturno-BackEnd/git/trees/${sha}`;
    return this.httpService.get(apiUrl);
  }
}
