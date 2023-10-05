import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './github.service';
import { HttpService } from '@nestjs/axios';
import { Observable, of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';

jest.mock('@nestjs/axios');

const mockHttpService = {
  get: jest.fn(),
};

describe('ApiService', () => {
  let apiService: ApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    apiService = module.get<ApiService>(ApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getAllCommits', () => {
    it('should call the GitHub API to fetch commits', async () => {
      const mockResponse: AxiosResponse = {
        data: [{ sha: '123', message: 'Test commit' }],
        status: 200,
        statusText: 'OK',
        headers: {} as any, // Use any for headers to avoid the error
        config: {} as any,
      };
      mockHttpService.get.mockReturnValueOnce(of(mockResponse));

      const user = 'testuser';
      const repo = 'testrepo';
      const result = await apiService.getAllCommits(user, repo).toPromise();

      expect(result).toEqual(mockResponse);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        `https://api.github.com/repos/${user}/${repo}/commits`,
      );
    });
  });

  describe('getCommitData', () => {
    it('should call the GitHub API to fetch commit data', async () => {
      const mockResponse: AxiosResponse = {
        data: { tree: [{ path: 'testPath', type: 'testType' }] },
        status: 200,
        statusText: 'OK',
        headers: {} as any, // Use any for headers to avoid the error
        config: {} as any,
      };
      mockHttpService.get.mockReturnValueOnce(of(mockResponse));

      const user = 'testuser';
      const repo = 'testrepo';
      const sha = 'testsha';
      const result = await apiService
        .getCommitData(user, repo, sha)
        .toPromise();

      expect(result).toEqual(mockResponse);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        `https://api.github.com/repos/${user}/${repo}/git/trees/${sha}`,
      );
    });
  });

  describe('handleError', () => {
    it('should throw HttpException with appropriate message', () => {
      const errorMessage = 'Test error message';
      const error = { response: { data: { message: errorMessage } } };

      expect(() => {
        apiService.handleError(error);
      }).toThrowError(HttpException);
      try {
        apiService.handleError(error);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe(errorMessage);
        expect(e.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
