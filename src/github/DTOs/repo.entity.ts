export class RepoDTO {
  name: string;
  privateRepo: boolean;

  constructor(name: string, privateRepo: boolean) {
    this.name = name;
    this.privateRepo = privateRepo;
  }
}
