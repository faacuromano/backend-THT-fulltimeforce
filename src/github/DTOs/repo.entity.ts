export class DeepCommitDTO {
  path: string;
  type: string;

  constructor(path: string, type: string) {
    this.path = path;
    this.type = type;
  }
}
